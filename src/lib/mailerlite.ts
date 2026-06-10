/**
 * MailerLite client · fetch() direct vers l'API MailerLite (sans SDK).
 *
 * Separation des responsabilites :
 *   - Resend   = emails transactionnels (confirmation, alerte interne, PDF)
 *   - MailerLite = audience & automations marketing (groupes, sequences)
 *
 * On n'envoie PAS de welcome double via MailerLite : l'upsert ajoute
 * simplement le contact a un groupe, ce qui declenche les automations
 * configurees dans le dashboard MailerLite.
 *
 * API MailerLite · https://developers.mailerlite.com/docs/subscribers.html
 *   POST https://connect.mailerlite.com/api/subscribers
 *   Authorization: Bearer <MAILERLITE_API_KEY>
 *   Content-Type: application/json
 *   Accept: application/json
 *   Body: { email, fields?, groups?: ["GROUP_ID"] }
 *   Upsert idempotent : si le contact existe deja, il est mis a jour.
 */

const apiKey = import.meta.env.MAILERLITE_API_KEY;
const BASE = "https://connect.mailerlite.com/api";

export interface UpsertArgs {
  email: string;
  name?: string;
  fields?: Record<string, unknown>;
  groups?: string[];
}

export async function upsertSubscriber(
  args: UpsertArgs,
): Promise<{ ok: boolean; id?: string; skipped?: boolean }> {
  const { email, name, fields, groups } = args;

  if (!apiKey) {
    console.warn("[mailerlite] skipped (no API key)", { email });
    return { ok: false, skipped: true };
  }

  const body: Record<string, unknown> = { email };

  // Merge name into fields.name (MailerLite custom fields)
  const mergedFields: Record<string, unknown> = { ...(fields ?? {}) };
  if (name) mergedFields["name"] = name;
  if (Object.keys(mergedFields).length > 0) body["fields"] = mergedFields;

  if (groups && groups.length > 0) body["groups"] = groups;

  try {
    const response = await fetch(`${BASE}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(
        "[mailerlite] error",
        response.status,
        errText.slice(0, 200),
      );
      return { ok: false };
    }

    const data = (await response.json()) as { data?: { id?: string } };
    return { ok: true, id: data?.data?.id };
  } catch (err) {
    console.warn("[mailerlite] fetch exception (non-fatal)", err);
    return { ok: false };
  }
}
