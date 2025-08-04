import { c as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_yOR9iWGp.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

function ReservationConfirmation() {
  const [reservation, setReservation] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      console.log("[Confirmation] Fetching reservation for id:", id);
      fetch(`/api/reservation-db?id=${id}`).then((res) => res.json()).then((data) => {
        console.log("[Confirmation] Reservation data:", data);
        setTimeout(() => {
          setReservation(data);
          if (data && data.userId) {
            fetch(`/api/utilisateur-db`).then((r) => r.json()).then((users) => {
              const u = users.find((u2) => String(u2.id) === String(data.userId));
              console.log("[Confirmation] User data:", u);
              setUser(u);
            });
          }
        }, 1e3);
      }).catch((e) => {
        console.error("[Confirmation] Error fetching reservation:", e);
      });
    }
  }, []);
  if (!reservation) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto py-12 text-center", children: "Chargement du récapitulatif..." });
  }
  return /* @__PURE__ */ jsx("section", { className: "container mx-auto py-12 max-w-xl", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow p-8 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4 text-pink-700", children: "Réservation confirmée !" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 text-lg text-gray-700", children: [
      /* @__PURE__ */ jsxs("b", { children: [
        "Merci ",
        user ? `${user.nom}` : "",
        " pour votre réservation !"
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      user && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: user.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 text-left max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("b", { children: "Service :" }),
        " ",
        reservation.serviceName || reservation.formationName || /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Non renseigné" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("b", { children: "Date :" }),
        " ",
        reservation.date || /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }),
        " à ",
        reservation.time || /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("b", { children: "Statut :" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: reservation.status === "confirmed" ? "text-green-700 font-semibold" : reservation.status === "cancelled" ? "text-red-700 font-semibold" : "text-yellow-700 font-semibold", children: reservation.status })
      ] }),
      reservation.notes && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("b", { children: "Notes :" }),
        " ",
        reservation.notes
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-green-100 text-green-800 p-4 rounded mb-4", children: "Un email de confirmation va vous être envoyé." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "bg-pink-700 text-white px-6 py-3 rounded hover:bg-pink-800", children: "Retour à l'accueil" })
  ] }) });
}

const $$Confirmation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ReservationConfirmation", ReservationConfirmation, {})} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/reservations/confirmation.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/reservations/confirmation.astro";
const $$url = "/reservations/confirmation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Confirmation,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
