import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Table, e as TableHeader, f as TableRow, g as TableHead, h as TableBody, i as TableCell } from '../../chunks/select_DkjlLY-f.mjs';
import { B as Badge } from '../../chunks/badge_BYVOTwHv.mjs';
import { I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogTitle, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
export { renderers } from '../../renderers.mjs';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    userId: "",
    serviceId: "",
    date: "",
    time: "",
    status: "pending",
    notes: ""
  });
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    console.log("[AdminReservations] Fetching reservations, users, services...");
    Promise.all([
      fetch("/api/reservation-db").then((r) => r.json()),
      fetch("/api/utilisateur-db").then((r) => r.json()),
      fetch("/api/service-db").then((r) => r.json())
    ]).then(([res, us, sv]) => {
      console.log("[AdminReservations] Reservations:", res);
      console.log("[AdminReservations] Users:", us);
      console.log("[AdminReservations] Services:", sv);
      setTimeout(() => {
        setReservations(res);
        setUsers(us);
        setServices(sv);
        setLoading(false);
      }, 1e3);
    }).catch((e) => {
      console.error("[AdminReservations] Error fetching data:", e);
      setLoading(false);
    });
  }, []);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [periodDate, setPeriodDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  function isInPeriod(dateStr) {
    if (periodFilter === "all") return true;
    const d = new Date(dateStr);
    const ref = new Date(periodDate);
    if (isNaN(d) || isNaN(ref)) return true;
    if (periodFilter === "day") {
      return d.toISOString().slice(0, 10) === ref.toISOString().slice(0, 10);
    }
    if (periodFilter === "week") {
      const getMonday = (dt) => {
        const t = new Date(dt);
        t.setDate(t.getDate() - (t.getDay() + 6) % 7);
        t.setHours(0, 0, 0, 0);
        return t;
      };
      return getMonday(d).getTime() === getMonday(ref).getTime() && d.getFullYear() === ref.getFullYear();
    }
    if (periodFilter === "month") {
      return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
    }
    if (periodFilter === "year") {
      return d.getFullYear() === ref.getFullYear();
    }
    return true;
  }
  const filtered = reservations.filter((r) => {
    if (serviceFilter !== "all" && r.serviceId?.toString() !== serviceFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (!isInPeriod(r.date)) return false;
    if (search) {
      const user = users.find((u) => u.id === r.userId);
      const service = services.find((s) => s.id === r.serviceId);
      return r.id.toString().includes(search) || user && (user.nom?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase())) || service && service.nom?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ userId: "", serviceId: "", date: "", time: "", status: "pending", notes: "" });
    setOpenDialog(true);
  };
  const handleOpenEdit = (r) => {
    setEditId(r.id);
    setForm({
      userId: r.userId,
      serviceId: r.serviceId,
      date: r.date,
      time: r.time,
      status: r.status,
      notes: r.notes || ""
    });
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditId(null);
    setForm({ userId: "", serviceId: "", date: "", time: "", status: "pending", notes: "" });
    setFeedback("");
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/reservation-db?id=${editId}` : "/api/reservation-db";
      const payload = {
        ...form,
        userId: form.userId ? Number(form.userId) : "",
        serviceId: form.serviceId ? Number(form.serviceId) : ""
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFeedback(editId ? "Réservation modifiée !" : "Réservation ajoutée !");
        const newRes = await fetch("/api/reservation-db").then((r) => r.json());
        setReservations(newRes);
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
      const idNum = Number(deleteId);
      const res = await fetch(`/api/reservation-db?id=${idNum}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Réservation supprimée.");
        setReservations(await fetch("/api/reservation-db").then((r) => r.json()));
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
  if (!reservations || !users || !services) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-red-600", children: "Erreur de chargement des données." });
  }
  const now = /* @__PURE__ */ new Date();
  const toDate = (d) => /* @__PURE__ */ new Date(d.date + "T" + (d.time || "00:00"));
  const future = filtered.filter((r) => toDate(r) >= now);
  const past = filtered.filter((r) => toDate(r) < now);
  const next = future.sort((a, b) => toDate(a) - toDate(b))[0];
  const last = past.sort((a, b) => toDate(b) - toDate(a))[0];
  const todayStr = now.toISOString().slice(0, 10);
  const today = filtered.filter((r) => r.date === todayStr);
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - (now.getDay() + 6) % 7);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  const inWeek = filtered.filter((r) => {
    const d = toDate(r);
    return d >= weekStart && d <= weekEnd;
  });
  const month = filtered.filter((r) => {
    const d = toDate(r);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const serviceCount = {};
  filtered.forEach((r) => {
    if (r.serviceId) serviceCount[r.serviceId] = (serviceCount[r.serviceId] || 0) + 1;
  });
  const topServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, count]) => {
    const s = services.find((s2) => s2.id.toString() === id);
    return s ? `${s.nom} (${count})` : `Service #${id} (${count})`;
  });
  const statusCount = {};
  filtered.forEach((r) => {
    statusCount[r.status] = (statusCount[r.status] || 0) + 1;
  });
  const dominantStatus = Object.entries(statusCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const alerts = [];
  const futureCancelled = future.filter((r) => r.status === "cancelled");
  if (futureCancelled.length) alerts.push(`${futureCancelled.length} réservation(s) annulée(s) à venir`);
  const futurePending = future.filter((r) => r.status === "pending");
  if (futurePending.length) alerts.push(`${futurePending.length} réservation(s) en attente à traiter`);
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-2 md:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Réservations" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Recherche... (nom, email, service)",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "max-w-xs"
          }
        ),
        /* @__PURE__ */ jsx(Button, { onClick: handleOpenAdd, variant: "default", className: "w-full sm:w-auto", children: "Ajouter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-blue-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-700", children: "Prochaine réservation" }),
        next ? /* @__PURE__ */ jsxs("span", { className: "font-bold text-base text-blue-900", children: [
          next.date,
          " ",
          next.time,
          " — ",
          (() => {
            const u = users.find((u2) => u2.id === next.userId);
            return u ? u.nom : "Client";
          })(),
          " (",
          (() => {
            const s = services.find((s2) => s2.id === next.serviceId);
            return s ? s.nom : "Service";
          })(),
          ")"
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Aucune à venir" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-gray-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Dernière passée" }),
        last ? /* @__PURE__ */ jsxs("span", { className: "font-bold text-base text-gray-800", children: [
          last.date,
          " ",
          last.time,
          " — ",
          (() => {
            const u = users.find((u2) => u2.id === last.userId);
            return u ? u.nom : "Client";
          })(),
          " (",
          (() => {
            const s = services.find((s2) => s2.id === last.serviceId);
            return s ? s.nom : "Service";
          })(),
          ")"
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Aucune passée" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-green-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-green-700", children: "À venir" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-green-900", children: future.length }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-green-700", children: [
          "Aujourd’hui : ",
          today.length,
          " / Semaine : ",
          inWeek.length,
          " / Mois : ",
          month.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-pink-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-pink-700", children: "Top services" }),
        topServices.length ? topServices.map((s, i) => /* @__PURE__ */ jsxs("span", { className: "text-pink-900 text-sm", children: [
          i + 1,
          ". ",
          s
        ] }, i)) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Aucun" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-yellow-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px] md:col-span-2 xl:col-span-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-yellow-700", children: "Statut dominant" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-base text-yellow-900", children: dominantStatus })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-red-50 p-4 flex flex-col gap-1 shadow-sm min-h-[90px] md:col-span-2 xl:col-span-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-red-700", children: "Alertes" }),
        alerts.length ? alerts.map((a, i) => /* @__PURE__ */ jsx("span", { className: "text-red-900 text-sm", children: a }, i)) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Aucune alerte" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto rounded-lg shadow bg-white p-2 md:p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-2 items-center", children: [
        /* @__PURE__ */ jsxs(Select, { value: periodFilter, onValueChange: (value) => setPeriodFilter(value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-36", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Période" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Toutes dates" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "day", children: "Jour" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "week", children: "Semaine" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "month", children: "Mois" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "year", children: "Année" })
          ] })
        ] }),
        periodFilter !== "all" && /* @__PURE__ */ jsx(
          Input,
          {
            type: "date",
            value: periodDate,
            onChange: (e) => setPeriodDate(e.target.value),
            className: "w-40",
            min: "2000-01-01",
            max: "2100-12-31"
          }
        ),
        /* @__PURE__ */ jsxs(Select, { value: serviceFilter, onValueChange: (value) => setServiceFilter(value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Filtrer par service" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous les services" }),
            services.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id.toString(), children: s.nom }, s.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: (value) => setStatusFilter(value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Filtrer par statut" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tous statuts" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "En attente" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "confirmed", children: "Confirmée" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Annulée" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Client" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Service" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Heure" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Statut" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Notes" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "text-center", children: "Aucune réservation" }) }) : [...filtered].sort((a, b) => b.date.localeCompare(a.date)).map((r) => {
          const user = users.find((u) => u.id === r.userId);
          const service = services.find((s) => s.id === r.serviceId);
          return /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: user ? `${user.nom} (${user.email})` : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Inconnu" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: service ? service.nom : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Inconnu" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: r.date }),
            /* @__PURE__ */ jsx(TableCell, { children: r.time }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: r.status === "confirmed" ? "default" : r.status === "cancelled" ? "destructive" : "secondary", children: r.status }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", title: r.notes, children: r.notes || /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => handleOpenEdit(r), children: "Éditer" }),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "destructive", onClick: () => setDeleteId(r.id), children: "Supprimer" })
            ] })
          ] }, r.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: editId ? "Modifier la réservation" : "Ajouter une réservation" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Client" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.userId || "",
                onValueChange: (value) => setForm((f) => ({ ...f, userId: value })),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un utilisateur" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: users.map((u) => /* @__PURE__ */ jsxs(SelectItem, { value: u.id.toString(), children: [
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
                onValueChange: (value) => setForm((f) => ({ ...f, serviceId: value })),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un service" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: services.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id.toString(), children: s.nom }, s.id)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Date" }),
            /* @__PURE__ */ jsx(Input, { name: "date", type: "date", value: form.date, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Heure" }),
            /* @__PURE__ */ jsx(Input, { name: "time", type: "time", value: form.time, onChange: handleFormChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Statut" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: form.status || "pending",
                onValueChange: (value) => setForm((f) => ({ ...f, status: value })),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "pending", children: "En attente" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "confirmed", children: "Confirmée" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Annulée" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Notes (optionnel)" }),
          /* @__PURE__ */ jsx(Input, { name: "notes", type: "text", value: form.notes, onChange: handleFormChange, placeholder: "Notes, précisions, etc." })
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
      /* @__PURE__ */ jsx(DialogTitle, { children: "Supprimer la réservation ?" }),
      /* @__PURE__ */ jsx("div", { className: "py-4", children: "Cette action est irréversible. Confirmer la suppression ?" }),
      feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-pink-700 font-semibold", children: feedback }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: () => setDeleteId(null), children: "Annuler" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: handleDelete, disabled: submitting, children: "Supprimer" })
      ] })
    ] }) })
  ] });
}

const $$Reservations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> ${renderComponent($$result2, "AdminReservations", AdminReservations, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@admin/AdminReservations.jsx", "client:component-export": "default" })} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/reservations.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/reservations.astro";
const $$url = "/admin/reservations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reservations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
