# @waimia/atelier-ui · preview

Primitives partagées de l'aperçu (vignettes iframe `/preview/<type>`) pour les trois espaces
de l'Atelier (catalogue, studio, builder).

## Contrat

Chaque grille de vignettes rend, par section, un wrapper marqué `data-lazy-preview` contenant
un `iframe` porteur de `data-src` (jamais `src` au départ) :

```html
<span data-lazy-preview>
  <iframe data-src="/preview/hero-split" loading="lazy" title="hero-split"></iframe>
</span>
```

`useThumbQueue(containerRef, deps)` promeut alors `data-src → src` à la demande
(IntersectionObserver, `rootMargin: 400px`) en respectant une file de concurrence
(`maxConcurrent: 3` par défaut) : au plus trois iframes chargent en même temps, la suivante
démarre à la libération d'un slot (`load`/`error`). C'est le port React fidèle de
`packages/catalogue-ui/src/lazy-preview.ts`.

## À venir (vagues 2)

- `PreviewFrame` : composant React qui rend le wrapper + l'iframe scalée (port de
  `src/scripts/preview-frame.ts`), branché sur `useThumbQueue`.
- Consommé par les futures primitives `../picker`, `../canvas`, `../inspector`.
