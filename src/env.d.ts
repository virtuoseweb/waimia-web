/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    variant?: "a" | "b";
  }
}

// Chargeur de section propagé (src/lib/lazy-section.ts) : module synthétique d'Astro.
declare module '*?astroPropagatedAssets' {
  const mod: {
    __astroPropagation: true;
    getMod: () => Promise<{ Component: any }>;
    collectedLinks: string[];
    collectedStyles: string[];
  };
  export default mod;
}
