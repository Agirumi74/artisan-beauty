import { c as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell } from '../../chunks/select_DkjlLY-f.mjs';
import { I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
export { renderers } from '../../renderers.mjs';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
function AdminGalerie() {
  const [galerie, setGalerie] = useState([]);
  const [services, setServices] = useState([]);
  const [formations, setFormations] = useState([]);
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
  const [form, setForm] = useState({ title: "", imageUrl: "", alt: "", description: "", uploadedBy: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState({ key: "createdAt", dir: "desc" });
  const fileInputRef = useRef();
  useEffect(() => {
    Promise.all([
      fetch("/api/galerie-db").then((r) => r.json()),
      fetch("/api/service-db").then((r) => r.json()),
      fetch("/api/formation-db").then((r) => r.json()).then((res) => res.data)
    ]).then(([galerie2, services2, formations2]) => {
      setGalerie(galerie2);
      setServices(services2);
      setFormations(formations2);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);
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
  const filtered = galerie.filter((g) => {
    if (serviceFilter !== "all" && String(g.serviceId) !== serviceFilter) return false;
    if (formationFilter !== "all" && String(g.formationId) !== formationFilter) return false;
    if (globalFilter !== "all" && String(g.global) !== globalFilter) return false;
    if (servicesGlobalFilter !== "all" && String(g.servicesGlobal) !== servicesGlobalFilter) return false;
    if (formationsGlobalFilter !== "all" && String(g.formationsGlobal) !== formationsGlobalFilter) return false;
    if (!isInPeriod(g.createdAt)) return false;
    if (search) {
      return g.title?.toLowerCase().includes(search.toLowerCase()) || g.description?.toLowerCase().includes(search.toLowerCase()) || g.uploadedBy?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    const { key, dir } = sort;
    let va = a[key], vb = b[key];
    if (typeof va === "string") va = va.toLowerCase();
    if (typeof vb === "string") vb = vb.toLowerCase();
    if (va === void 0 || va === null) va = "";
    if (vb === void 0 || vb === null) vb = "";
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ title: "", imageUrl: "", alt: "", description: "", uploadedBy: "" });
    setImageFile(null);
    setImagePreview("");
    setOpenDialog(true);
    setFeedback("");
  };
  const handleOpenEdit = (g) => {
    setEditId(g.id);
    setForm({
      title: g.title,
      imageUrl: g.imageUrl || "",
      alt: g.alt || "",
      description: g.description,
      uploadedBy: g.uploadedBy || ""
    });
    setImageFile(null);
    setImagePreview(g.imageUrl || "");
    setOpenDialog(true);
    setFeedback("");
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditId(null);
    setForm({ title: "", imageUrl: "", alt: "", description: "", uploadedBy: "" });
    setImageFile(null);
    setImagePreview("");
    setFeedback("");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
      if (!allowed.includes(file.type)) {
        setFeedback("Format d'image non autorisé (jpg, png, webp, avif)");
        fileInputRef.current.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFeedback("Image trop volumineuse (max 5 Mo)");
        fileInputRef.current.value = "";
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm((f) => ({ ...f, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFeedback("");
    if (!form.title.trim()) {
      setFeedback("Le titre est obligatoire.");
      setSubmitting(false);
      return;
    }
    if (!form.alt.trim()) {
      setFeedback("Le texte alternatif (accessibilité) est obligatoire.");
      setSubmitting(false);
      return;
    }
    if (!form.description.trim()) {
      setFeedback("La description est obligatoire.");
      setSubmitting(false);
      return;
    }
    let imageUrl = form.imageUrl;
    if (imageFile) {
      const data = new FormData();
      data.append("file", imageFile);
      const uploadRes = await fetch("/api/upload-galerie-image", { method: "POST", body: data });
      if (uploadRes.ok) {
        const { filename } = await uploadRes.json();
        imageUrl = filename;
      } else {
        setFeedback("Erreur upload image");
        setSubmitting(false);
        return;
      }
    }
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/galerie-db?id=${editId}` : "/api/galerie-db";
      const payload = {
        ...form,
        imageUrl
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setToast(editId ? "Image modifiée !" : "Image ajoutée !");
        setGalerie(await fetch("/api/galerie-db").then((r) => r.json()));
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
      const res = await fetch(`/api/galerie-db?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Image supprimée.");
        setGalerie(await fetch("/api/galerie-db").then((r) => r.json()));
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
  if (!galerie) return /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-red-600", children: "Erreur de chargement de la galerie." });
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl mx-auto px-2 md:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Galerie" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Recherche... (titre, description, auteur)",
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
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Type d’image" }),
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
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: [
        { key: "title", label: "Titre" },
        { key: "description", label: "Description" },
        { key: "uploadedBy", label: "Auteur" },
        { key: "createdAt", label: "Date" },
        { key: "actions", label: "Actions" }
      ].map((col) => /* @__PURE__ */ jsxs(
        TableHead,
        {
          onClick: () => col.key !== "actions" && setSort((s) => ({ key: col.key, dir: s.key === col.key && s.dir === "asc" ? "desc" : "asc" })),
          className: col.key !== "actions" ? "cursor-pointer select-none" : "",
          "aria-sort": sort.key === col.key ? sort.dir === "asc" ? "ascending" : "descending" : void 0,
          children: [
            col.label,
            sort.key === col.key ? sort.dir === "asc" ? " ▲" : " ▼" : null
          ]
        },
        col.key
      )) }) }),
      /* @__PURE__ */ jsx(TableBody, { children: paginated.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 5, children: "Aucune image enregistrée." }) }) : paginated.map((g) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          Array.isArray(g.images) && g.images.length > 0 ? g.images.slice(0, 2).map((img, idx) => /* @__PURE__ */ jsx("img", { src: img, alt: g.alt || (g.title ? `Image galerie : ${g.title} (${idx + 1})` : `Image galerie ${idx + 1}`), className: "h-12 w-12 object-cover rounded shadow" }, img + idx)) : g.imageUrl ? /* @__PURE__ */ jsx("img", { src: g.imageUrl, alt: g.alt || (g.title ? `Image galerie : ${g.title}` : "Image galerie"), className: "h-12 w-12 object-cover rounded shadow" }) : null,
          /* @__PURE__ */ jsx("span", { children: g.title })
        ] }) }),
        /* @__PURE__ */ jsx(TableCell, { children: g.description }),
        /* @__PURE__ */ jsx(TableCell, { children: g.uploadedBy }),
        /* @__PURE__ */ jsx(TableCell, { children: g.createdAt ? g.createdAt.slice(0, 10) : "-" }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleOpenEdit(g), children: "Éditer" }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => setDeleteId(g.id), children: "Supprimer" })
        ] })
      ] }, g.id)) })
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
        " résultat",
        total > 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: editId ? "Modifier l’image" : "Ajouter une image" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Image" }),
            imageFile || imagePreview ? /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("img", { src: imageFile ? imagePreview : imagePreview ? imagePreview : void 0, alt: form.alt || (form.title ? `Image galerie : ${form.title}` : "Image galerie"), className: "h-16 rounded shadow" }),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: handleRemoveImage, children: "Supprimer" })
            ] }) : null,
            /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageChange, className: "block", "aria-label": "Image de la galerie" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Titre" }),
            /* @__PURE__ */ jsx(Input, { name: "title", value: form.title, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Texte alternatif (accessibilité)" }),
            /* @__PURE__ */ jsx(Input, { name: "alt", value: form.alt, onChange: handleFormChange, required: true, maxLength: 180, placeholder: "Ex : Maquillage mariée bohème à Annecy, ambiance champêtre, bouquet, robe fluide…" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Auteur" }),
            /* @__PURE__ */ jsx(Input, { name: "uploadedBy", value: form.uploadedBy, onChange: handleFormChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Description" }),
            /* @__PURE__ */ jsx(Input, { name: "description", value: form.description, onChange: handleFormChange, required: true })
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
      /* @__PURE__ */ jsx(DialogTitle, { children: "Supprimer l’image ?" }),
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

const $$Galerie = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Galerie" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminGalerie", AdminGalerie, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/admin/AdminGalerie.jsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/galerie.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/galerie.astro";
const $$url = "/admin/galerie";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galerie,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
