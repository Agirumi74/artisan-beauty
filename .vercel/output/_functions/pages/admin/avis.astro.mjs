import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell } from '../../chunks/select_DkjlLY-f.mjs';
import { I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
export { renderers } from '../../renderers.mjs';

function AdminAvis() {
  const [avis, setAvis] = useState([]);
  const [services, setServices] = useState([]);
  const [formations, setFormations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [formationFilter, setFormationFilter] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("all");
  const [servicesGlobalFilter, setServicesGlobalFilter] = useState("all");
  const [formationsGlobalFilter, setFormationsGlobalFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [periodDate, setPeriodDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ utilisateur: "", commentaire: "", note: 5, serviceId: "", formationId: "", global: 0 });
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    Promise.all([
      fetch("/api/avis-db").then((r) => r.json()),
      fetch("/api/service-db").then((r) => r.json()),
      fetch("/api/formation-db").then((r) => r.json()).then((res) => res.data),
      fetch("/api/utilisateur-db").then((r) => r.json())
    ]).then(([avis2, services2, formations2, users2]) => {
      setAvis(avis2);
      setServices(services2);
      setFormations(formations2);
      setUsers(users2);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  function isInPeriod(dateStr) {
    if (periodFilter === "all") return true;
    if (!dateStr) return true;
    const d = new Date(dateStr);
    const ref = new Date(periodDate);
    if (isNaN(d) || isNaN(ref)) return true;
    if (periodFilter === "day") {
      return d.toISOString().slice(0, 10) === ref.toISOString().slice(0, 10);
    }
    if (periodFilter === "month") {
      return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
    }
    if (periodFilter === "year") {
      return d.getFullYear() === ref.getFullYear();
    }
    return true;
  }
  const filtered = avis.filter((a) => {
    if (serviceFilter !== "all" && String(a.serviceId) !== serviceFilter) return false;
    if (formationFilter !== "all" && String(a.formationId) !== formationFilter) return false;
    if (globalFilter !== "all" && String(a.global) !== globalFilter) return false;
    if (servicesGlobalFilter !== "all" && String(a.servicesGlobal) !== servicesGlobalFilter) return false;
    if (formationsGlobalFilter !== "all" && String(a.formationsGlobal) !== formationsGlobalFilter) return false;
    if (!isInPeriod(a.createdAt)) return false;
    if (search) {
      const user = users.find((u) => u.id == a.utilisateur);
      const service = services.find((s) => s.id == a.serviceId);
      const formation = formations.find((f) => f.id == a.formationId);
      return a.utilisateur?.toLowerCase().includes(search.toLowerCase()) || a.commentaire?.toLowerCase().includes(search.toLowerCase()) || user && (user.nom?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase())) || service && service.nom?.toLowerCase().includes(search.toLowerCase()) || formation && formation.titre?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ utilisateur: "", commentaire: "", note: 5, serviceId: "", global: 0 });
    setOpenDialog(true);
  };
  const handleOpenEdit = (a) => {
    setEditId(a.id);
    setForm({
      utilisateur: a.utilisateur,
      commentaire: a.commentaire,
      note: a.note,
      serviceId: a.serviceId || "",
      global: a.global || 0
    });
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditId(null);
    setForm({ utilisateur: "", commentaire: "", note: 5, serviceId: "", global: 0 });
    setFeedback("");
  };
  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/avis-db?id=${editId}` : "/api/avis-db";
      const payload = {
        ...form,
        note: Number(form.note),
        global: Number(form.global),
        serviceId: form.serviceId ? Number(form.serviceId) : null
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFeedback(editId ? "Avis modifié !" : "Avis ajouté !");
        setAvis(await fetch("/api/avis-db").then((r) => r.json()));
        handleCloseDialog();
      } else {
        setFeedback("Erreur lors de l'enregistrement.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    setFeedback("");
    try {
      const res = await fetch(`/api/avis-db?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Avis supprimé.");
        setAvis(await fetch("/api/avis-db").then((r) => r.json()));
        setDeleteId(null);
      } else {
        setFeedback("Erreur lors de la suppression.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: "Chargement..." });
  if (!avis) return /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-red-600", children: "Erreur de chargement des avis." });
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl mx-auto px-2 md:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Avis" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Recherche... (auteur, contenu, service, email)",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "max-w-xs"
          }
        ),
        /* @__PURE__ */ jsx(Button, { onClick: handleOpenAdd, variant: "default", className: "w-full sm:w-auto", children: "Ajouter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4 items-center bg-gray-50 p-3 rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: () => {
        setServiceFilter("all");
        setFormationFilter("all");
        setGlobalFilter("all");
        setServicesGlobalFilter("all");
        setFormationsGlobalFilter("all");
        setPeriodFilter("all");
        setPeriodDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
        setSearch("");
      }, children: "Réinitialiser" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Service" }),
        /* @__PURE__ */ jsxs(Select, { value: serviceFilter, onValueChange: (v) => {
          setServiceFilter(v);
          if (v !== "all") {
            setGlobalFilter("0");
            setServicesGlobalFilter("0");
            setFormationsGlobalFilter("0");
          }
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tous les services" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous les services" }),
            services.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: String(s.id), children: s.nom }, s.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Formation" }),
        /* @__PURE__ */ jsxs(Select, { value: formationFilter, onValueChange: (v) => {
          setFormationFilter(v);
          if (v !== "all") {
            setGlobalFilter("0");
            setServicesGlobalFilter("0");
            setFormationsGlobalFilter("0");
          }
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Toutes les formations" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Toutes les formations" }),
            formations.map((f) => /* @__PURE__ */ jsx(SelectItem, { value: String(f.id), children: f.titre }, f.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Type d’avis" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("input", { type: "radio", name: "globalType", value: "global", checked: globalFilter === "1", onChange: () => {
              setGlobalFilter("1");
              setServicesGlobalFilter("all");
              setFormationsGlobalFilter("all");
              setServiceFilter("all");
              setFormationFilter("all");
            } }),
            " Global"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("input", { type: "radio", name: "globalType", value: "servicesGlobal", checked: servicesGlobalFilter === "1", onChange: () => {
              setGlobalFilter("0");
              setServicesGlobalFilter("1");
              setFormationsGlobalFilter("all");
              setFormationFilter("all");
            } }),
            " Services global"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("input", { type: "radio", name: "globalType", value: "formationsGlobal", checked: formationsGlobalFilter === "1", onChange: () => {
              setGlobalFilter("0");
              setServicesGlobalFilter("all");
              setFormationsGlobalFilter("1");
              setServiceFilter("all");
            } }),
            " Formations global"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Période" }),
        /* @__PURE__ */ jsxs(Select, { value: periodFilter, onValueChange: setPeriodFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Période" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Toutes dates" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "day", children: "Jour" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "month", children: "Mois" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "year", children: "Année" })
          ] })
        ] })
      ] }),
      periodFilter !== "all" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Date" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "date",
            value: periodDate,
            onChange: (e) => setPeriodDate(e.target.value),
            className: "w-36",
            min: "2000-01-01",
            max: "2100-12-31"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg shadow bg-white p-2 md:p-4", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Auteur" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Note" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Contenu" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Service" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Formation" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Global" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Services Global" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Formations Global" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "text-center", children: "Aucun avis" }) }) : [...filtered].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")).map((a) => {
        const user = users.find((u) => u.id == a.utilisateur);
        const service = services.find((s) => s.id == a.serviceId);
        const formation = formations.find((f) => f.id == a.formationId);
        return /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: user ? `${user.nom} (${user.email})` : a.utilisateur }),
          /* @__PURE__ */ jsx(TableCell, { children: a.note ?? "-" }),
          /* @__PURE__ */ jsx(TableCell, { children: a.commentaire }),
          /* @__PURE__ */ jsx(TableCell, { children: service ? service.nom : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) }),
          /* @__PURE__ */ jsx(TableCell, { children: formation ? formation.titre : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) }),
          /* @__PURE__ */ jsx(TableCell, { children: a.global ? "Oui" : "Non" }),
          /* @__PURE__ */ jsx(TableCell, { children: a.servicesGlobal ? "Oui" : "Non" }),
          /* @__PURE__ */ jsx(TableCell, { children: a.formationsGlobal ? "Oui" : "Non" }),
          /* @__PURE__ */ jsx(TableCell, { children: a.createdAt ? a.createdAt.slice(0, 10) : "-" }),
          /* @__PURE__ */ jsxs(TableCell, { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => handleOpenEdit(a), children: "Éditer" }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "destructive", onClick: () => setDeleteId(a.id), children: "Supprimer" })
          ] })
        ] }, a.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: editId ? "Modifier l'avis" : "Ajouter un avis" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Auteur" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.utilisateur || "",
                onValueChange: (value) => setForm((f) => ({ ...f, utilisateur: value })),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un utilisateur" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: users.map((u) => /* @__PURE__ */ jsxs(SelectItem, { value: String(u.id), children: [
                    u.nom,
                    " (",
                    u.email,
                    ")"
                  ] }, u.id)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Service" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.serviceId || "",
                onValueChange: (value) => {
                  setForm((f) => ({ ...f, serviceId: value, global: 0, servicesGlobal: 0, formationsGlobal: 0 }));
                },
                disabled: form.global === 1 || form.servicesGlobal === 1,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un service" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "", children: "Aucun" }),
                    services.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: String(s.id), children: s.nom }, s.id))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Formation" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.formationId || "",
                onValueChange: (value) => {
                  setForm((f) => ({ ...f, formationId: value, global: 0, servicesGlobal: 0, formationsGlobal: 0 }));
                },
                disabled: form.global === 1 || form.formationsGlobal === 1,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir une formation" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "", children: "Aucune" }),
                    formations.map((f) => /* @__PURE__ */ jsx(SelectItem, { value: String(f.id), children: f.titre }, f.id))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Note" }),
            /* @__PURE__ */ jsx(Input, { name: "note", type: "number", min: 1, max: 5, value: form.note, onChange: handleFormChange, required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Contenu" }),
          /* @__PURE__ */ jsx(Input, { name: "commentaire", type: "text", value: form.commentaire, onChange: handleFormChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Type d’avis" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "globalTypeForm", value: "global", checked: form.global === 1, onChange: () => setForm((f) => ({ ...f, global: 1, servicesGlobal: 0, formationsGlobal: 0, serviceId: "", formationId: "" })) }),
              " Global"
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "globalTypeForm", value: "servicesGlobal", checked: form.servicesGlobal === 1, onChange: () => setForm((f) => ({ ...f, global: 0, servicesGlobal: 1, formationsGlobal: 0, formationId: "" })) }),
              " Services global"
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "globalTypeForm", value: "formationsGlobal", checked: form.formationsGlobal === 1, onChange: () => setForm((f) => ({ ...f, global: 0, servicesGlobal: 0, formationsGlobal: 1, serviceId: "" })) }),
              " Formations global"
            ] })
          ] })
        ] }),
        feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-pink-700 font-semibold", children: feedback }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: handleCloseDialog, children: "Annuler" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", disabled: submitting, children: editId ? "Enregistrer" : "Ajouter" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteId, onOpenChange: (v) => {
      if (!v) setDeleteId(null);
    }, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Supprimer l'avis ?" }),
      /* @__PURE__ */ jsx("div", { className: "py-4", children: "Cette action est irréversible. Confirmer la suppression ?" }),
      feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-pink-700 font-semibold", children: feedback }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: () => setDeleteId(null), children: "Annuler" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: handleDelete, disabled: submitting, children: "Supprimer" })
      ] })
    ] }) })
  ] });
}

const $$Avis = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> ${renderComponent($$result2, "AdminAvis", AdminAvis, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@admin/AdminAvis.jsx", "client:component-export": "default" })} </section>` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/avis.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/avis.astro";
const $$url = "/admin/avis";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Avis,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
