// Ancienne adresse de la grille : ce service worker remplace celui de la page installée, efface
// son cache, se désinstalle et ouvre la nouvelle adresse (grille/redirection.py).
const ADRESSE = "https://www.grillepolitique.fr/";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (ev) => ev.waitUntil((async () => {
  await Promise.all((await caches.keys()).map((cle) => caches.delete(cle)));
  await self.registration.unregister();
  for (const fenetre of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) {
    const ancienne = new URL(fenetre.url);
    fenetre.navigate(ADRESSE + ancienne.search + ancienne.hash).catch(() => {});
  }
})()));
