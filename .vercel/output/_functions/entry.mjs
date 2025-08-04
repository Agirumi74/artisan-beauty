import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CiIJ8P5u.mjs';
import { manifest } from './manifest_D7BluCC9.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/accueil.astro.mjs');
const _page2 = () => import('./pages/admin/avis.astro.mjs');
const _page3 = () => import('./pages/admin/calendrier.astro.mjs');
const _page4 = () => import('./pages/admin/contact.astro.mjs');
const _page5 = () => import('./pages/admin/factures.astro.mjs');
const _page6 = () => import('./pages/admin/formations.astro.mjs');
const _page7 = () => import('./pages/admin/galerie.astro.mjs');
const _page8 = () => import('./pages/admin/gallery.astro.mjs');
const _page9 = () => import('./pages/admin/planning.astro.mjs');
const _page10 = () => import('./pages/admin/reservations.astro.mjs');
const _page11 = () => import('./pages/admin/services.astro.mjs');
const _page12 = () => import('./pages/admin/utilisateurs.astro.mjs');
const _page13 = () => import('./pages/admin.astro.mjs');
const _page14 = () => import('./pages/api/admin-block.astro.mjs');
const _page15 = () => import('./pages/api/auth.astro.mjs');
const _page16 = () => import('./pages/api/avis.astro.mjs');
const _page17 = () => import('./pages/api/avis-db.astro.mjs');
const _page18 = () => import('./pages/api/contact.astro.mjs');
const _page19 = () => import('./pages/api/facture.astro.mjs');
const _page20 = () => import('./pages/api/facture-db.astro.mjs');
const _page21 = () => import('./pages/api/faq-db.astro.mjs');
const _page22 = () => import('./pages/api/formation.astro.mjs');
const _page23 = () => import('./pages/api/formation-db.astro.mjs');
const _page24 = () => import('./pages/api/galerie.astro.mjs');
const _page25 = () => import('./pages/api/galerie-db.astro.mjs');
const _page26 = () => import('./pages/api/gallery-db.astro.mjs');
const _page27 = () => import('./pages/api/logout.astro.mjs');
const _page28 = () => import('./pages/api/planning.astro.mjs');
const _page29 = () => import('./pages/api/reservation.astro.mjs');
const _page30 = () => import('./pages/api/reservation-db.astro.mjs');
const _page31 = () => import('./pages/api/service.astro.mjs');
const _page32 = () => import('./pages/api/service-db.astro.mjs');
const _page33 = () => import('./pages/api/upload-galerie-image.astro.mjs');
const _page34 = () => import('./pages/api/upload-service-image.astro.mjs');
const _page35 = () => import('./pages/api/utilisateur.astro.mjs');
const _page36 = () => import('./pages/api/utilisateur-db.astro.mjs');
const _page37 = () => import('./pages/avis.astro.mjs');
const _page38 = () => import('./pages/contact.astro.mjs');
const _page39 = () => import('./pages/equipe.astro.mjs');
const _page40 = () => import('./pages/factures.astro.mjs');
const _page41 = () => import('./pages/formations/_slug_.astro.mjs');
const _page42 = () => import('./pages/formations.astro.mjs');
const _page43 = () => import('./pages/galerie.astro.mjs');
const _page44 = () => import('./pages/login.astro.mjs');
const _page45 = () => import('./pages/logout.astro.mjs');
const _page46 = () => import('./pages/reservations/confirmation.astro.mjs');
const _page47 = () => import('./pages/reservations.astro.mjs');
const _page48 = () => import('./pages/services/_slug_.astro.mjs');
const _page49 = () => import('./pages/services.astro.mjs');
const _page50 = () => import('./pages/utilisateurs.astro.mjs');
const _page51 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/accueil.astro", _page1],
    ["src/pages/admin/avis.astro", _page2],
    ["src/pages/admin/calendrier.astro", _page3],
    ["src/pages/admin/contact.astro", _page4],
    ["src/pages/admin/factures.astro", _page5],
    ["src/pages/admin/formations.astro", _page6],
    ["src/pages/admin/galerie.astro", _page7],
    ["src/pages/admin/gallery.astro", _page8],
    ["src/pages/admin/planning.astro", _page9],
    ["src/pages/admin/reservations.astro", _page10],
    ["src/pages/admin/services.astro", _page11],
    ["src/pages/admin/utilisateurs.astro", _page12],
    ["src/pages/admin/index.astro", _page13],
    ["src/pages/api/admin-block.ts", _page14],
    ["src/pages/api/auth.ts", _page15],
    ["src/pages/api/avis.ts", _page16],
    ["src/pages/api/avis-db.ts", _page17],
    ["src/pages/api/contact.ts", _page18],
    ["src/pages/api/facture.ts", _page19],
    ["src/pages/api/facture-db.ts", _page20],
    ["src/pages/api/faq-db.ts", _page21],
    ["src/pages/api/formation.ts", _page22],
    ["src/pages/api/formation-db.ts", _page23],
    ["src/pages/api/galerie.ts", _page24],
    ["src/pages/api/galerie-db.ts", _page25],
    ["src/pages/api/gallery-db.ts", _page26],
    ["src/pages/api/logout.ts", _page27],
    ["src/pages/api/planning.ts", _page28],
    ["src/pages/api/reservation.ts", _page29],
    ["src/pages/api/reservation-db.ts", _page30],
    ["src/pages/api/service.ts", _page31],
    ["src/pages/api/service-db.ts", _page32],
    ["src/pages/api/upload-galerie-image.ts", _page33],
    ["src/pages/api/upload-service-image.ts", _page34],
    ["src/pages/api/utilisateur.ts", _page35],
    ["src/pages/api/utilisateur-db.ts", _page36],
    ["src/pages/avis.astro", _page37],
    ["src/pages/contact.astro", _page38],
    ["src/pages/equipe.astro", _page39],
    ["src/pages/factures.astro", _page40],
    ["src/pages/formations/[slug].astro", _page41],
    ["src/pages/formations/index.astro", _page42],
    ["src/pages/galerie.astro", _page43],
    ["src/pages/login.astro", _page44],
    ["src/pages/logout.astro", _page45],
    ["src/pages/reservations/confirmation.astro", _page46],
    ["src/pages/reservations/index.astro", _page47],
    ["src/pages/services/[slug].astro", _page48],
    ["src/pages/services/index.astro", _page49],
    ["src/pages/utilisateurs.astro", _page50],
    ["src/pages/index.astro", _page51]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d98dd6d3-abb9-4da5-8895-4ee15112a779",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
