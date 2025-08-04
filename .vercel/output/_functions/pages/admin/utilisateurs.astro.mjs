import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import { B as Button, I as Input, D as Dialog, a as DialogContent, b as DialogTitle, e as DialogDescription, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell } from '../../chunks/select_DkjlLY-f.mjs';
export { renderers } from '../../renderers.mjs';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
function AdminUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [form, setForm] = React.useState({ nom: "", email: "", role: "client", password: "" });
  const [feedback, setFeedback] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [toast, setToast] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sort, setSort] = React.useState({ key: "createdAt", dir: "desc" });
  React.useEffect(() => {
    setLoading(true);
    fetch("/api/utilisateur-db").then((r) => r.json()).then((data) => {
      setUtilisateurs(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  React.useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ nom: "", email: "", role: "client", password: "" });
    setOpenDialog(true);
    setFeedback("");
  };
  const handleOpenEdit = (u) => {
    setEditId(u.id);
    setForm({ nom: u.nom, email: u.email, role: u.role, password: "" });
    setOpenDialog(true);
    setFeedback("");
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditId(null);
    setForm({ nom: "", email: "", role: "client", password: "" });
    setFeedback("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    if (!form.nom.trim() || !form.email.trim() || !form.role.trim() || !editId && !form.password.trim()) {
      setFeedback("Tous les champs sont obligatoires (mot de passe requis à la création).");
      setSubmitting(false);
      return;
    }
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/utilisateur-db?id=${editId}` : "/api/utilisateur-db";
      const payload = { ...form };
      if (editId && !form.password) delete payload.password;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setToast(editId ? "Utilisateur modifié !" : "Utilisateur ajouté !");
        setUtilisateurs(await fetch("/api/utilisateur-db").then((r) => r.json()));
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
      const res = await fetch(`/api/utilisateur-db?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setToast("Utilisateur supprimé.");
        setUtilisateurs(await fetch("/api/utilisateur-db").then((r) => r.json()));
        setDeleteId(null);
      } else {
        setFeedback("Erreur lors de la suppression.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  let filtered = utilisateurs.filter((u) => {
    if (search && !`${u.nom} ${u.email}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    return true;
  });
  filtered = filtered.sort((a, b) => {
    const { key, dir } = sort;
    let va = a[key] || "";
    let vb = b[key] || "";
    if (key === "createdAt") {
      va = va || "";
      vb = vb || "";
      return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    if (typeof va === "string" && typeof vb === "string") {
      return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return 0;
  });
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Utilisateurs" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleOpenAdd, children: "Ajouter" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4 items-end", children: [
      /* @__PURE__ */ jsx(Input, { placeholder: "Recherche nom/email...", value: search, onChange: (e) => {
        setSearch(e.target.value);
        setPage(1);
      }, className: "w-48" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Rôle" }),
        /* @__PURE__ */ jsxs(Select, { value: roleFilter, onValueChange: (v) => {
          setRoleFilter(v);
          setPage(1);
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tous les rôles" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "client", children: "Client" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxs(TableHead, { className: "cursor-pointer", onClick: () => setSort((s) => ({ key: "nom", dir: s.key === "nom" && s.dir === "asc" ? "desc" : "asc" })), children: [
          "Nom ",
          sort.key === "nom" ? sort.dir === "asc" ? "▲" : "▼" : null
        ] }),
        /* @__PURE__ */ jsxs(TableHead, { className: "cursor-pointer", onClick: () => setSort((s) => ({ key: "email", dir: s.key === "email" && s.dir === "asc" ? "desc" : "asc" })), children: [
          "Email ",
          sort.key === "email" ? sort.dir === "asc" ? "▲" : "▼" : null
        ] }),
        /* @__PURE__ */ jsxs(TableHead, { className: "cursor-pointer", onClick: () => setSort((s) => ({ key: "role", dir: s.key === "role" && s.dir === "asc" ? "desc" : "asc" })), children: [
          "Rôle ",
          sort.key === "role" ? sort.dir === "asc" ? "▲" : "▼" : null
        ] }),
        /* @__PURE__ */ jsxs(TableHead, { className: "cursor-pointer", onClick: () => setSort((s) => ({ key: "createdAt", dir: s.key === "createdAt" && s.dir === "asc" ? "desc" : "asc" })), children: [
          "Créé le ",
          sort.key === "createdAt" ? sort.dir === "asc" ? "▲" : "▼" : null
        ] }),
        /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: paginated.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 5, children: "Aucun utilisateur." }) }) : paginated.map((u) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: u.nom }),
        /* @__PURE__ */ jsx(TableCell, { children: u.email }),
        /* @__PURE__ */ jsx(TableCell, { children: u.role }),
        /* @__PURE__ */ jsx(TableCell, { children: u.createdAt ? u.createdAt.slice(0, 10) : "-" }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleOpenEdit(u), children: "Éditer" }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => setDeleteId(u.id), children: "Supprimer" })
        ] })
      ] }, u.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-center mt-4 gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
          "Page ",
          page,
          " / ",
          pageCount
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: String(pageSize), onValueChange: (v) => {
          setPageSize(Number(v));
          setPage(1);
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-24 h-8 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: PAGE_SIZE_OPTIONS.map((opt) => /* @__PURE__ */ jsxs(SelectItem, { value: String(opt), children: [
            opt,
            " / page"
          ] }, opt)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        page > 1 && /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "secondary", onClick: () => setPage((p) => Math.max(1, p - 1)), "aria-label": "Page précédente", children: "Précédent" }),
        page < pageCount && /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "secondary", onClick: () => setPage((p) => Math.min(pageCount, p + 1)), "aria-label": "Page suivante", children: "Suivant" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
        total,
        " utilisateur",
        total > 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: editId ? "Modifier l'utilisateur" : "Ajouter un utilisateur" }),
      /* @__PURE__ */ jsx(DialogDescription, { "aria-describedby": "Formulaire utilisateur", children: editId ? "Modifiez les informations de l'utilisateur." : "Remplissez le formulaire pour ajouter un nouvel utilisateur." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Nom" }),
            /* @__PURE__ */ jsx(Input, { name: "nom", value: form.nom, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { name: "email", value: form.email, onChange: handleFormChange, required: true, type: "email", autoComplete: "email" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Rôle" }),
            /* @__PURE__ */ jsxs("select", { name: "role", value: form.role, onChange: handleFormChange, className: "w-full border rounded px-3 py-2", children: [
              /* @__PURE__ */ jsx("option", { value: "client", children: "Client" }),
              /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold mb-1", children: [
              "Mot de passe ",
              editId ? /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "(laisser vide pour ne pas changer)" }) : null
            ] }),
            /* @__PURE__ */ jsx(Input, { name: "password", value: form.password, onChange: handleFormChange, type: "password", autoComplete: "new-password", minLength: 6, placeholder: editId ? "Nouveau mot de passe (optionnel)" : "Mot de passe (min 6 caractères)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: handleCloseDialog, disabled: submitting, children: "Annuler" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", disabled: submitting, children: editId ? "Enregistrer" : "Ajouter" })
        ] }),
        feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-red-600 mt-2", children: feedback })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!deleteId, onOpenChange: (open) => {
      if (!open) setDeleteId(null);
    }, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Supprimer l'utilisateur ?" }),
      /* @__PURE__ */ jsx("div", { children: "Cette action est irréversible." }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: () => setDeleteId(null), disabled: submitting, children: "Annuler" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: handleDelete, disabled: submitting, children: "Supprimer" })
      ] }),
      feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-red-600 mt-2", children: feedback })
    ] }) }),
    toast && /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", className: "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50", children: [
      toast,
      /* @__PURE__ */ jsx("button", { onClick: () => setToast(""), className: "ml-4 text-white/80 hover:text-white font-bold", children: "×" })
    ] })
  ] });
}

const $$Utilisateurs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> ${renderComponent($$result2, "AdminUtilisateurs", AdminUtilisateurs, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/admin/AdminUtilisateurs.jsx", "client:component-export": "default" })} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/utilisateurs.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/utilisateurs.astro";
const $$url = "/admin/utilisateurs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Utilisateurs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
