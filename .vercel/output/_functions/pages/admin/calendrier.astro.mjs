import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { B as Button, D as Dialog, a as DialogContent, b as DialogTitle, I as Input, d as DialogFooter } from '../../chunks/input_B5ZRx2KT.mjs';
import '../../chunks/badge_BYVOTwHv.mjs';
export { renderers } from '../../renderers.mjs';

function ReservationCreateForm({ data, users, services, onClose, onCreate }) {
  const [form, setForm] = React.useState({
    userId: data.userId || "",
    serviceId: data.serviceId || "",
    date: data.date || "",
    time: data.time || "",
    status: data.status || "pending",
    notes: data.notes || ""
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    try {
      const payload = {
        ...form,
        userId: form.userId ? Number(form.userId) : "",
        serviceId: form.serviceId ? Number(form.serviceId) : ""
      };
      const res = await fetch("/api/reservation-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const created = await res.json();
        setFeedback("Réservation créée !");
        onCreate(created);
      } else {
        setFeedback("Erreur lors de la création.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Client" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full rounded border px-2 py-1",
            name: "userId",
            value: form.userId,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Choisir..." }),
              users.map((u) => /* @__PURE__ */ jsxs("option", { value: u.id, children: [
                u.nom,
                " (",
                u.email,
                ")"
              ] }, u.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Service" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full rounded border px-2 py-1",
            name: "serviceId",
            value: form.serviceId,
            onChange: handleChange,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Choisir..." }),
              services.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.nom }, s.id))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Date" }),
        /* @__PURE__ */ jsx("input", { name: "date", type: "date", className: "w-full rounded border px-2 py-1", value: form.date, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Heure" }),
        /* @__PURE__ */ jsx("input", { name: "time", type: "time", className: "w-full rounded border px-2 py-1", value: form.time, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Statut" }),
        /* @__PURE__ */ jsxs("select", { name: "status", className: "w-full rounded border px-2 py-1", value: form.status, onChange: handleChange, required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "pending", children: "En attente" }),
          /* @__PURE__ */ jsx("option", { value: "confirmed", children: "Confirmée" }),
          /* @__PURE__ */ jsx("option", { value: "cancelled", children: "Annulée" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Notes (optionnel)" }),
      /* @__PURE__ */ jsx("input", { name: "notes", type: "text", className: "w-full rounded border px-2 py-1", value: form.notes, onChange: handleChange, placeholder: "Notes, précisions, etc." })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-pink-700 font-semibold", children: feedback }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: onClose, children: "Annuler" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", disabled: submitting, children: "Créer" })
    ] })
  ] });
}
function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/api/reservation-db").then((res) => res.json()),
      fetch("/api/admin-block").then((res) => res.json()),
      fetch("/api/utilisateur-db").then((res) => res.json()),
      fetch("/api/service-db").then((res) => res.json())
    ]).then(([reservations, blocks, us, sv]) => {
      setUsers(us);
      setServices(sv);
      const reservationEvents = reservations.map((r) => {
        const user = us.find((u) => u.id === r.userId);
        const service = sv.find((s) => s.id === r.serviceId);
        return {
          id: r.id,
          title: service ? service.nom : r.serviceName || `Réservation #${r.id}`,
          start: `${r.date}T${r.time}`,
          allDay: false,
          color: r.status === "confirmed" ? "#22c55e" : r.status === "cancelled" ? "#ef4444" : "#facc15",
          extendedProps: {
            ...r,
            userName: user ? user.nom : "",
            userEmail: user ? user.email : "",
            serviceName: service ? service.nom : ""
          }
        };
      });
      const blockEvents = blocks.map((b) => ({
        id: `block-${b.id}`,
        title: b.title,
        start: b.start,
        end: b.end,
        allDay: !!b.allDay,
        color: "#a1a1aa",
        blocked: true,
        extendedProps: { blocked: true, ...b }
      }));
      setEvents([...reservationEvents, ...blockEvents]);
      setLoading(false);
    }).catch((e) => {
      setError("Erreur de chargement");
      setLoading(false);
    });
  }, []);
  const [blockDialog, setBlockDialog] = useState(false);
  const [blockInfo, setBlockInfo] = useState(null);
  const handleDateSelect = (selectInfo) => {
    setBlockInfo({ start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay });
    setBlockDialog(true);
  };
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setModal({
      type: event.extendedProps.blocked ? "block" : "reservation",
      data: event.extendedProps,
      eventObj: event
    });
  };
  const statusLegend = [
    { label: "Confirmée", color: "#22c55e", key: "confirmed" },
    { label: "En attente", color: "#facc15", key: "pending" },
    { label: "Annulée", color: "#ef4444", key: "cancelled" }
  ];
  const [manualBlockDialog, setManualBlockDialog] = useState(false);
  const [manualBlock, setManualBlock] = useState({ start: "", end: "", title: "" });
  const [quickAction, setQuickAction] = useState(null);
  if (loading) return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: "Chargement du calendrier..." });
  if (error) return /* @__PURE__ */ jsx("div", { className: "text-center text-red-600 py-12", children: error });
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-6 mb-4 items-center", children: [
      statusLegend.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block w-4 h-4 rounded-full", style: { background: s.color } }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: s.label })
      ] }, s.key)),
      /* @__PURE__ */ jsx(Button, { variant: "default", className: "ml-auto", onClick: () => setManualBlockDialog(true), children: "Bloquer un créneau" })
    ] }),
    /* @__PURE__ */ jsx(
      FullCalendar,
      {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        locale: "fr",
        events,
        eventContent: renderEventContent,
        height: 750,
        slotMinTime: "08:00:00",
        slotMaxTime: "21:00:00",
        eventMaxStack: 3,
        eventDisplay: "block",
        selectable: true,
        select: handleDateSelect,
        eventClick: handleEventClick,
        editable: true,
        eventDrop: async function(info) {
          const { id, extendedProps, start } = info.event;
          if (extendedProps.blocked) return;
          const date = start.toISOString().slice(0, 10);
          const time = start.toTimeString().slice(0, 5);
          const payload = {
            ...extendedProps,
            date,
            time,
            userId: extendedProps.userId,
            serviceId: extendedProps.serviceId
          };
          const res = await fetch(`/api/reservation-db?id=${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const updated = await res.json();
            setEvents((evts) => evts.map((e) => e.id === updated.id ? {
              ...e,
              start: `${updated.date}T${updated.time}`,
              extendedProps: { ...e.extendedProps, ...updated }
            } : e));
          } else {
            info.revert();
            alert("Erreur lors du déplacement de la réservation.");
          }
        },
        eventResize: async function(info) {
          const { id, extendedProps, start, end } = info.event;
          if (extendedProps.blocked) return;
          const date = start.toISOString().slice(0, 10);
          const time = start.toTimeString().slice(0, 5);
          let duration = 60;
          if (end && start) {
            duration = Math.round((end.getTime() - start.getTime()) / 6e4);
          }
          const payload = {
            ...extendedProps,
            date,
            time,
            duration,
            userId: extendedProps.userId,
            serviceId: extendedProps.serviceId
          };
          const res = await fetch(`/api/reservation-db?id=${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const updated = await res.json();
            setEvents((evts) => evts.map((e) => e.id === updated.id ? {
              ...e,
              start: `${updated.date}T${updated.time}`,
              end: end ? end.toISOString() : void 0,
              extendedProps: { ...e.extendedProps, ...updated }
            } : e));
          } else {
            info.revert();
            alert("Erreur lors du redimensionnement de la réservation.");
          }
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-4", children: "Cliquez sur une case pour bloquer un créneau, cliquez sur un événement pour voir le détail ou éditer." }),
    modal && /* @__PURE__ */ jsx(Dialog, { open: !!modal, onOpenChange: (v) => {
      if (!v) setModal(null);
    }, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: modal.type === "reservation" ? "Détail/édition réservation" : modal.type === "reservation-create" ? "Créer une réservation" : "Créneau bloqué" }),
      modal.type === "reservation" && typeof ReservationEditForm === "function" && /* @__PURE__ */ jsx(
        ReservationEditForm,
        {
          data: modal.data,
          users,
          services,
          onClose: () => setModal(null),
          onUpdate: (updated) => {
            setEvents((evts) => evts.map((e) => e.id === updated.id ? {
              ...e,
              start: `${updated.date}T${updated.time}`,
              extendedProps: { ...e.extendedProps, ...updated }
            } : e));
            setModal(null);
          },
          onDelete: (deletedId) => {
            setEvents((evts) => evts.filter((e) => e.id !== deletedId));
            setModal(null);
          }
        }
      ),
      modal.type === "reservation-create" && /* @__PURE__ */ jsx(
        ReservationCreateForm,
        {
          data: modal.data,
          users,
          services,
          onClose: () => setModal(null),
          onCreate: (created) => {
            setEvents((evts) => [
              ...evts,
              {
                id: created.id,
                title: services.find((s) => s.id === created.serviceId)?.nom || "Réservation",
                start: `${created.date}T${created.time}`,
                allDay: false,
                color: created.status === "confirmed" ? "#22c55e" : created.status === "cancelled" ? "#ef4444" : "#facc15",
                extendedProps: {
                  ...created,
                  userName: users.find((u) => u.id === created.userId)?.nom || "",
                  userEmail: users.find((u) => u.id === created.userId)?.email || "",
                  serviceName: services.find((s) => s.id === created.serviceId)?.nom || ""
                }
              }
            ]);
            setModal(null);
          }
        }
      ),
      modal.type === "block" && /* @__PURE__ */ jsx(
        BlockEditForm,
        {
          data: modal.data,
          onClose: () => setModal(null),
          onUpdate: (updated) => {
            setEvents((evts) => evts.map((e) => e.id === `block-${updated.id}` ? {
              ...e,
              title: updated.title,
              start: updated.start,
              end: updated.end,
              allDay: !!updated.allDay,
              extendedProps: { ...e.extendedProps, ...updated }
            } : e));
            setModal(null);
          },
          onDelete: (deletedId) => {
            setEvents((evts) => evts.filter((e) => e.id !== `block-${deletedId}`));
            setModal(null);
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: blockDialog, onOpenChange: setBlockDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Bloquer un créneau" }),
      blockInfo && /* @__PURE__ */ jsxs("form", { onSubmit: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        if (!title) return;
        const newEvent = {
          title,
          start: blockInfo.start,
          end: blockInfo.end,
          allDay: blockInfo.allDay,
          blocked: true
        };
        try {
          const res = await fetch("/api/admin-block", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
          });
          let data;
          try {
            data = await res.json();
          } catch {
            data = null;
          }
          if (res.ok && data && data.id) {
            setEvents((events2) => [
              ...events2,
              { ...newEvent, id: `block-${data.id}`, extendedProps: { blocked: true, ...newEvent } }
            ]);
            setBlockDialog(false);
          } else {
            alert("Erreur lors de la création du créneau bloqué.");
          }
        } catch {
          alert("Erreur réseau lors de la création du créneau bloqué.");
        }
      }, className: "flex flex-col gap-4 mt-2", children: [
        /* @__PURE__ */ jsx(Input, { name: "title", placeholder: "Motif ou nom du créneau", required: true }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: () => setBlockDialog(false), children: "Annuler" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", children: "Bloquer" })
        ] })
      ] })
    ] }) }),
    quickAction && /* @__PURE__ */ jsx(Dialog, { open: !!quickAction, onOpenChange: (v) => {
      if (!v) setQuickAction(null);
    }, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm w-full", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Que souhaitez-vous faire ?" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", onClick: () => {
          setModal({
            type: "reservation-create",
            data: {
              date: quickAction.date,
              time: quickAction.time,
              userId: "",
              serviceId: "",
              status: "pending",
              notes: ""
            }
          });
          setQuickAction(null);
        }, children: "Créer une réservation" }),
        /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: () => {
          setBlockInfo({
            start: quickAction.date + "T" + quickAction.time,
            end: null,
            allDay: false
          });
          setBlockDialog(true);
          setQuickAction(null);
        }, children: "Bloquer un créneau" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-4", children: "Cliquez sur une case pour bloquer un créneau, cliquez sur un événement pour voir le détail ou éditer." })
  ] });
}
function BlockEditForm({ data, onClose, onUpdate, onDelete }) {
  const [form, setForm] = React.useState({
    title: data.title || "",
    start: data.start || "",
    end: data.end || "",
    allDay: !!data.allDay
  });
  useEffect(() => {
    setForm({
      title: data.title || "",
      start: data.start || "",
      end: data.end || "",
      allDay: !!data.allDay
    });
  }, [data]);
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    try {
      const payload = { ...form };
      const res = await fetch(`/api/admin-block?id=${data.id || data.blocked?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFeedback("Créneau modifié !");
        onUpdate({ ...payload, id: data.id || data.blocked?.id });
      } else {
        setFeedback("Erreur lors de la modification.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  const handleDelete = async () => {
    if (!window.confirm("Supprimer ce créneau ?")) return;
    setSubmitting(true);
    setFeedback("");
    try {
      const res = await fetch(`/api/admin-block?id=${data.id || data.blocked?.id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback("Créneau supprimé.");
        onDelete(data.id || data.blocked?.id);
      } else {
        setFeedback("Erreur lors de la suppression.");
      }
    } catch {
      setFeedback("Erreur réseau.");
    }
    setSubmitting(false);
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Motif" }),
      /* @__PURE__ */ jsx("input", { name: "title", type: "text", className: "w-full rounded border px-2 py-1", value: form.title, onChange: handleChange, required: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Début" }),
        /* @__PURE__ */ jsx("input", { name: "start", type: "datetime-local", className: "w-full rounded border px-2 py-1", value: form.start, onChange: handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block font-semibold mb-1", children: "Fin" }),
        /* @__PURE__ */ jsx("input", { name: "end", type: "datetime-local", className: "w-full rounded border px-2 py-1", value: form.end, onChange: handleChange })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsx("input", { name: "allDay", type: "checkbox", checked: form.allDay, onChange: handleChange, id: "allDay" }),
        /* @__PURE__ */ jsx("label", { htmlFor: "allDay", className: "font-semibold", children: "Journée entière" })
      ] })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-pink-700 font-semibold", children: feedback }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", onClick: handleDelete, disabled: submitting, children: "Supprimer" }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", onClick: onClose, children: "Annuler" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", disabled: submitting, children: "Enregistrer" })
    ] })
  ] });
}
function renderEventContent(eventInfo) {
  if (eventInfo.event.extendedProps.blocked) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center max-w-full overflow-hidden bg-black text-white px-2 py-1 rounded", style: { minWidth: 0 }, children: /* @__PURE__ */ jsx("span", { className: "truncate max-w-[160px] font-medium", title: eventInfo.event.title, children: eventInfo.event.title }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex items-center max-w-full overflow-hidden", style: { minWidth: 0 }, children: /* @__PURE__ */ jsx("span", { className: "truncate max-w-[160px] font-medium", title: eventInfo.event.extendedProps.userName || "", children: eventInfo.event.extendedProps.userName || "Client inconnu" }) });
}

const $$Calendrier = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container mx-auto py-12"> <h1 class="text-3xl font-bold mb-8 text-pink-700 text-center">Calendrier des réservations</h1> ${renderComponent($$result2, "AdminCalendar", AdminCalendar, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@admin/AdminCalendar.jsx", "client:component-export": "default" })} </section> ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/calendrier.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/calendrier.astro";
const $$url = "/admin/calendrier";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendrier,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
