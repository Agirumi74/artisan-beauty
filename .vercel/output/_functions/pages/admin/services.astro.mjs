import { c as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell } from '../../chunks/select_DkjlLY-f.mjs';
import { I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
export { renderers } from '../../renderers.mjs';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
const TAG_SUGGESTIONS = [
  "mariée",
  "shooting",
  "enfant",
  "soirée",
  "FX",
  "mode",
  "homme",
  "beauté",
  "artistique",
  "initiation"
];
function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearchRaw] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [activeFilter, setActiveFilterRaw] = useState("all");
  const [featuredFilter, setFeaturedFilterRaw] = useState("all");
  const setSearch = (v) => {
    setSearchRaw(v);
    setPage(1);
  };
  const setActiveFilter = (v) => {
    setActiveFilterRaw(v);
    setPage(1);
  };
  const setFeaturedFilter = (v) => {
    setFeaturedFilterRaw(v);
    setPage(1);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nom: "", description: "", prix: 0, duree: "", isActive: true, isFeatured: false, image: "", imageAlt: "", tags: [], steps: [], slug: "", imageName: "" });
  const [stepInput, setStepInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fileInputRef = useRef();
  useEffect(() => {
    fetch("/api/service-db").then((r) => r.json()).then((data) => {
      setServices(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const [sort, setSort] = useState({ key: "nom", dir: "asc" });
  const sortedServices = [...services].sort((a, b) => {
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
  const filtered = sortedServices.filter((s2) => {
    let tagsArr = Array.isArray(s2.tags) ? s2.tags : typeof s2.tags === "string" && s2.tags ? (() => {
      try {
        return JSON.parse(s2.tags);
      } catch {
        return [];
      }
    })() : [];
    if (tagFilter !== "all" && !tagsArr.includes(tagFilter)) return false;
    if (activeFilter !== "all" && String(s2.isActive ? 1 : 0) !== activeFilter) return false;
    if (featuredFilter !== "all" && String(s2.isFeatured ? 1 : 0) !== featuredFilter) return false;
    if (search) {
      return s2.nom?.toLowerCase().includes(search.toLowerCase()) || s2.description?.toLowerCase().includes(search.toLowerCase()) || tagsArr.join(" ").toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ nom: "", description: "", prix: 0, duree: "", isActive: true, isFeatured: false, image: "", imageAlt: "", tags: [], steps: [], slug: "" });
    setTagInput("");
    setStepInput("");
    setImageFile(null);
    setImagePreview("");
    setOpenDialog(true);
  };
  const handleOpenEdit = (s2) => {
    setEditId(s2.id);
    setForm({
      nom: s2.nom,
      description: s2.description,
      prix: s2.prix,
      duree: s2.duree || "",
      isActive: !!s2.isActive,
      isFeatured: !!s2.isFeatured,
      image: s2.image || "",
      imageAlt: s2.imageAlt || "",
      tags: Array.isArray(s2.tags) ? s2.tags : typeof s2.tags === "string" && s2.tags ? JSON.parse(s2.tags) : [],
      steps: Array.isArray(s2.steps) ? s2.steps : typeof s2.steps === "string" && s2.steps ? JSON.parse(s2.steps) : [],
      slug: s2.slug || ""
    });
    setTagInput("");
    setStepInput("");
    setImageFile(null);
    setImagePreview(s2.image ? `/assets/${s2.image.replace(/^.*[\\/]/, "")}` : "");
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditId(null);
    setForm({ nom: "", description: "", prix: 0, duree: "", isActive: true, isFeatured: false, image: "", imageAlt: "", tags: [], steps: [] });
    setTagInput("");
    setStepInput("");
    setImageFile(null);
    setImagePreview("");
    setFeedback("");
  };
  const handleAddStep = (e) => {
    e.preventDefault();
    const val = stepInput.trim();
    if (!val || form.steps.includes(val)) return;
    setForm((f) => ({ ...f, steps: [...f.steps, val] }));
    setStepInput("");
  };
  const handleRemoveStep = (step) => {
    setForm((f) => ({ ...f, steps: f.steps.filter((s2) => s2 !== step) }));
  };
  const handleAddTag = (e) => {
    e.preventDefault();
    const val = tagInput.trim();
    if (!val || form.tags.includes(val)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, val] }));
    setTagInput("");
  };
  const handleRemoveTag = (tag) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
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
    setForm((f) => ({ ...f, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  function slugify(str) {
    return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => {
      if (name === "nom") {
        if (!f.slug || f.slug === slugify(f.nom)) {
          return { ...f, nom: value, slug: slugify(value) };
        }
      }
      if (name === "imageName") {
        return { ...f, imageName: slugify(value) };
      }
      return { ...f, [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFeedback("");
    if (!form.nom.trim()) {
      setFeedback("Le nom est obligatoire.");
      setSubmitting(false);
      return;
    }
    if (!form.slug.trim() || !/^[a-z0-9\-]+$/.test(form.slug)) {
      setFeedback("Slug invalide (lettres, chiffres, tirets).");
      setSubmitting(false);
      return;
    }
    if (form.prix <= 0) {
      setFeedback("Le prix doit être supérieur à 0.");
      setSubmitting(false);
      return;
    }
    const slugExists = services.some((s2) => s2.slug === form.slug && s2.id !== editId);
    if (slugExists) {
      setFeedback("Ce slug existe déjà, choisissez-en un autre.");
      setSubmitting(false);
      return;
    }
    try {
      let imageName = form.image;
      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        if (form.imageName) data.append("name", form.imageName);
        const uploadRes = await fetch("/api/upload-service-image", { method: "POST", body: data });
        if (uploadRes.ok) {
          const { filename } = await uploadRes.json();
          imageName = filename;
        } else {
          setFeedback("Erreur upload image");
          setSubmitting(false);
          return;
        }
      }
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/service-db?id=${editId}` : "/api/service-db";
      const payload = {
        ...form,
        image: imageName,
        isActive: form.isActive ? 1 : 0,
        isFeatured: form.isFeatured ? 1 : 0
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setToast(editId ? "Service modifié !" : "Service ajouté !");
        setServices(await fetch("/api/service-db").then((r) => r.json()));
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
      const res = await fetch(`/api/service-db?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Service supprimé.");
        setServices(await fetch("/api/service-db").then((r) => r.json()));
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
  if (!services) return /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-red-600", children: "Erreur de chargement des services." });
  const s = Array.from(new Set(services.flatMap((s2) => {
    if (Array.isArray(s2.tags)) return s2.tags;
    if (typeof s2.tags === "string" && s2.tags) try {
      return JSON.parse(s2.tags);
    } catch {
      return [];
    }
    return [];
  }).filter(Boolean)));
  const stats = {
    total: services.length,
    actifs: services.filter((s2) => s2.isActive).length,
    vedettes: services.filter((s2) => s2.isFeatured).length
  };
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl mx-auto px-2 md:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-4 items-center bg-blue-50 p-3 rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        "Total : ",
        stats.total
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-green-700", children: [
        "Actifs : ",
        stats.actifs
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-yellow-700", children: [
        "Vedettes : ",
        stats.vedettes
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Services" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Recherche... (nom, description, tag)",
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
        setTagFilter("all");
        setActiveFilter("all");
        setFeaturedFilter("all");
        setSearch("");
      }, children: "Réinitialiser" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Tag" }),
        /* @__PURE__ */ jsxs(Select, { value: tagFilter, onValueChange: setTagFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tous les tags" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous les tags" }),
            s.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat, children: cat }, cat))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Actif" }),
        /* @__PURE__ */ jsxs(Select, { value: activeFilter, onValueChange: setActiveFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-28", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tous" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Oui" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "0", children: "Non" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold", children: "Vedette" }),
        /* @__PURE__ */ jsxs(Select, { value: featuredFilter, onValueChange: setFeaturedFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-28", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tous" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Oui" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "0", children: "Non" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: [
        { key: "nom", label: "Nom" },
        { key: "description", label: "Description" },
        { key: "prix", label: "Prix" },
        { key: "tags", label: "Tags" },
        { key: "duree", label: "Durée" },
        { key: "isActive", label: "Active" },
        { key: "isFeatured", label: "Vedette" },
        { key: "actions", label: "Actions" }
      ].map((col) => /* @__PURE__ */ jsxs(
        TableHead,
        {
          onClick: () => col.key !== "actions" && setSort((s2) => ({ key: col.key, dir: s2.key === col.key && s2.dir === "asc" ? "desc" : "asc" })),
          className: col.key !== "actions" ? "cursor-pointer select-none" : "",
          "aria-sort": sort.key === col.key ? sort.dir === "asc" ? "ascending" : "descending" : void 0,
          children: [
            col.label,
            sort.key === col.key ? sort.dir === "asc" ? " ▲" : " ▼" : null
          ]
        },
        col.key
      )) }) }),
      /* @__PURE__ */ jsx(TableBody, { children: paginated.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 8, children: "Aucun service enregistré." }) }) : paginated.map((s2) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: s2.nom }),
        /* @__PURE__ */ jsx(TableCell, { children: s2.description }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          s2.prix,
          " €"
        ] }),
        /* @__PURE__ */ jsx(TableCell, { children: Array.isArray(s2.tags) ? s2.tags.join(", ") : typeof s2.tags === "string" && s2.tags ? (() => {
          try {
            return JSON.parse(s2.tags).join(", ");
          } catch {
            return s2.tags;
          }
        })() : "" }),
        /* @__PURE__ */ jsx(TableCell, { children: s2.duree || (s2.durationMinutes ? s2.durationMinutes + " min" : "") }),
        /* @__PURE__ */ jsx(TableCell, { children: s2.isActive ? "Oui" : "Non" }),
        /* @__PURE__ */ jsx(TableCell, { children: s2.isFeatured ? "Oui" : "Non" }),
        /* @__PURE__ */ jsxs(TableCell, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleOpenEdit(s2), children: "Éditer" }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => setDeleteId(s2.id), children: "Supprimer" })
        ] })
      ] }, s2.id)) })
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
      /* @__PURE__ */ jsx(DialogTitle, { children: editId ? "Modifier le service" : "Ajouter un service" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Étapes du service" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: form.steps.map((step, idx) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center bg-blue-100 rounded px-2 py-0.5 text-xs", children: [
              step,
              /* @__PURE__ */ jsx("button", { type: "button", className: "ml-1 text-red-500 hover:text-red-700", onClick: () => handleRemoveStep(step), "aria-label": `Supprimer ${step}`, children: "×" })
            ] }, step + idx)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: stepInput,
                  onChange: (e) => setStepInput(e.target.value),
                  placeholder: "Ajouter une étape...",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddStep(e);
                    }
                  },
                  "aria-label": "Ajouter une étape"
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "secondary", onClick: handleAddStep, children: "Ajouter" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Tags" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: form.tags.map((tag) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center bg-gray-200 rounded px-2 py-0.5 text-xs", children: [
              tag,
              /* @__PURE__ */ jsx("button", { type: "button", className: "ml-1 text-red-500 hover:text-red-700", onClick: () => handleRemoveTag(tag), "aria-label": `Supprimer ${tag}`, children: "×" })
            ] }, tag)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: tagInput,
                  onChange: (e) => setTagInput(e.target.value),
                  placeholder: "Ajouter un tag...",
                  list: "tag-suggestions",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(e);
                    }
                  },
                  "aria-label": "Ajouter un tag"
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "secondary", onClick: handleAddTag, children: "Ajouter" })
            ] }),
            /* @__PURE__ */ jsx("datalist", { id: "tag-suggestions", children: TAG_SUGGESTIONS.filter((t) => !form.tags.includes(t)).map((t) => /* @__PURE__ */ jsx("option", { value: t }, t)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Image" }),
            imageFile || imagePreview ? /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("img", { src: imageFile ? imagePreview : imagePreview ? imagePreview : void 0, alt: "Preview", className: "h-16 rounded shadow" }),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: handleRemoveImage, children: "Supprimer" })
            ] }) : null,
            /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageChange, className: "block", "aria-label": "Image du service" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Nom de l’image (optionnel, sans extension)" }),
            /* @__PURE__ */ jsx(Input, { name: "imageName", value: form.imageName, onChange: handleFormChange, placeholder: "ex: shooting-mode-ete" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Le nom sera utilisé pour le fichier uploadé (slugifié)." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Texte alternatif (accessibilité)" }),
            /* @__PURE__ */ jsx(Input, { name: "imageAlt", value: form.imageAlt, onChange: handleFormChange, placeholder: "Description de l'image" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Nom" }),
            /* @__PURE__ */ jsx(Input, { name: "nom", value: form.nom, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Slug (URL)" }),
            /* @__PURE__ */ jsx(Input, { name: "slug", value: form.slug, onChange: handleFormChange, required: true, pattern: "[a-z0-9\\-]+" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Généré automatiquement, modifiable." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Prix (€)" }),
            /* @__PURE__ */ jsx(Input, { name: "prix", type: "number", value: form.prix, onChange: handleFormChange, required: true, min: 0, step: 0.01 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Description" }),
            /* @__PURE__ */ jsx(Input, { name: "description", value: form.description, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold mb-1", children: "Durée" }),
            /* @__PURE__ */ jsx(Input, { name: "duree", value: form.duree, onChange: handleFormChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", name: "isActive", checked: form.isActive, onChange: handleFormChange, id: "isActive" }),
            /* @__PURE__ */ jsx("label", { htmlFor: "isActive", className: "text-xs", children: "Actif" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", name: "isFeatured", checked: form.isFeatured, onChange: handleFormChange, id: "isFeatured" }),
            /* @__PURE__ */ jsx("label", { htmlFor: "isFeatured", className: "text-xs", children: "Vedette" })
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
      /* @__PURE__ */ jsx(DialogTitle, { children: "Supprimer le service ?" }),
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

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminServices", AdminServices, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@admin/AdminServices.jsx", "client:component-export": "default" })} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/services.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/services.astro";
const $$url = "/admin/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
