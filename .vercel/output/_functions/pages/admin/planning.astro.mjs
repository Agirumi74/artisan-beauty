import { c as createComponent, b as renderTemplate, m as maybeRenderHead, r as renderComponent } from '../../chunks/astro/server_BiuKQx4Z.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_v3SqN70E.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$PlanningTable = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["---\n", `<div class="bg-white rounded shadow p-4"> <h2 class="text-xl font-semibold mb-2">Planning</h2> <table class="min-w-full border" id="planning-table"> <thead> <tr> <th class="border px-2 py-1">Date</th> <th class="border px-2 py-1">Cr\xE9neau</th> <th class="border px-2 py-1">Statut</th> <th class="border px-2 py-1">Actions</th> </tr> </thead> <tbody id="planning-tbody"> <tr><td colspan="4" class="text-center">Chargement...</td></tr> </tbody> </table> <script>
    async function loadPlanning() {
      const tbody = document.getElementById('planning-tbody');
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">Chargement...</td></tr>';
      const res = await fetch('/api/planning');
      const planning = await res.json();
      if (!Array.isArray(planning) || planning.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Aucun cr\xE9neau</td></tr>';
        return;
      }
      tbody.innerHTML = '';
      planning.forEach(p => {
        const tr = document.createElement('tr');
        tr.id = 'row-' + p.id;
        tr.innerHTML = \`
          <td class="border px-2 py-1">\${p.date}</td>
          <td class="border px-2 py-1">\${p.startTime} - \${p.endTime}</td>
          <td class="border px-2 py-1">\${p.status}</td>
          <td class="border px-2 py-1">
            <button class="bg-red-500 text-white px-2 py-1 rounded ml-2" data-id="\${p.id}">Supprimer</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
      document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = btn.getAttribute('data-id');
          if (!confirm('Supprimer ce cr\xE9neau ?')) return;
          await fetch('/api/planning', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const row = document.getElementById('row-' + id);
          if (row) row.remove();
        });
      });
    }
    document.addEventListener('DOMContentLoaded', loadPlanning);
  <\/script> <form id="planning-form" class="mt-4 flex flex-wrap gap-2 items-end bg-gray-50 p-3 rounded shadow"> <div> <label for="date" class="block text-sm font-medium">Date</label> <input type="date" id="date" name="date" class="border rounded px-2 py-1" required> </div> <div> <label for="startTime" class="block text-sm font-medium">D\xE9but</label> <input type="time" id="startTime" name="startTime" class="border rounded px-2 py-1" required> </div> <div> <label for="endTime" class="block text-sm font-medium">Fin</label> <input type="time" id="endTime" name="endTime" class="border rounded px-2 py-1" required> </div> <div> <label for="status" class="block text-sm font-medium">Statut</label> <select id="status" name="status" class="border rounded px-2 py-1" required> <option value="Libre">Libre</option> <option value="Occup\xE9">Occup\xE9</option> <option value="Indisponible">Indisponible</option> </select> </div> <div> <label for="description" class="block text-sm font-medium">Description</label> <input type="text" id="description" name="description" class="border rounded px-2 py-1"> </div> <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button> <button type="button" id="cancel-edit" class="hidden bg-gray-400 text-white px-3 py-2 rounded">Annuler</button> <input type="hidden" id="planning-id" name="id"> </form> <script>
    // ...existing code...
    document.addEventListener('DOMContentLoaded', () => {
      loadPlanning();
      const form = document.getElementById('planning-form');
      const cancelBtn = document.getElementById('cancel-edit');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = form['planning-id'].value;
        const data = {
          date: form['date'].value,
          startTime: form['startTime'].value,
          endTime: form['endTime'].value,
          status: form['status'].value,
          description: form['description'].value
        };
        let method = 'POST';
        if (id) {
          data.id = id;
          method = 'PUT';
        }
        await fetch('/api/planning', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        form.reset();
        form['planning-id'].value = '';
        form.querySelector('button[type="submit"]').textContent = 'Ajouter';
        cancelBtn.classList.add('hidden');
        loadPlanning();
      });
      cancelBtn.addEventListener('click', () => {
        form.reset();
        form['planning-id'].value = '';
        form.querySelector('button[type="submit"]').textContent = 'Ajouter';
        cancelBtn.classList.add('hidden');
      });
      // \xC9dition (remplir le formulaire)
      document.addEventListener('click', (e) => {
        if (e.target && e.target.matches('button[data-edit-id]')) {
          const btn = e.target;
          const id = btn.getAttribute('data-edit-id');
          fetch('/api/planning').then(r => r.json()).then(planning => {
            const p = planning.find(x => x.id === id);
            if (p) {
              form['date'].value = p.date;
              form['startTime'].value = p.startTime;
              form['endTime'].value = p.endTime;
              form['status'].value = p.status;
              form['description'].value = p.description || '';
              form['planning-id'].value = p.id;
              form.querySelector('button[type="submit"]').textContent = 'Enregistrer';
              cancelBtn.classList.remove('hidden');
            }
          });
        }
      });
    });
    // ...existing code...
  <\/script> </div>`], ["---\n", `<div class="bg-white rounded shadow p-4"> <h2 class="text-xl font-semibold mb-2">Planning</h2> <table class="min-w-full border" id="planning-table"> <thead> <tr> <th class="border px-2 py-1">Date</th> <th class="border px-2 py-1">Cr\xE9neau</th> <th class="border px-2 py-1">Statut</th> <th class="border px-2 py-1">Actions</th> </tr> </thead> <tbody id="planning-tbody"> <tr><td colspan="4" class="text-center">Chargement...</td></tr> </tbody> </table> <script>
    async function loadPlanning() {
      const tbody = document.getElementById('planning-tbody');
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">Chargement...</td></tr>';
      const res = await fetch('/api/planning');
      const planning = await res.json();
      if (!Array.isArray(planning) || planning.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Aucun cr\xE9neau</td></tr>';
        return;
      }
      tbody.innerHTML = '';
      planning.forEach(p => {
        const tr = document.createElement('tr');
        tr.id = 'row-' + p.id;
        tr.innerHTML = \\\`
          <td class="border px-2 py-1">\\\${p.date}</td>
          <td class="border px-2 py-1">\\\${p.startTime} - \\\${p.endTime}</td>
          <td class="border px-2 py-1">\\\${p.status}</td>
          <td class="border px-2 py-1">
            <button class="bg-red-500 text-white px-2 py-1 rounded ml-2" data-id="\\\${p.id}">Supprimer</button>
          </td>
        \\\`;
        tbody.appendChild(tr);
      });
      document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = btn.getAttribute('data-id');
          if (!confirm('Supprimer ce cr\xE9neau ?')) return;
          await fetch('/api/planning', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const row = document.getElementById('row-' + id);
          if (row) row.remove();
        });
      });
    }
    document.addEventListener('DOMContentLoaded', loadPlanning);
  <\/script> <form id="planning-form" class="mt-4 flex flex-wrap gap-2 items-end bg-gray-50 p-3 rounded shadow"> <div> <label for="date" class="block text-sm font-medium">Date</label> <input type="date" id="date" name="date" class="border rounded px-2 py-1" required> </div> <div> <label for="startTime" class="block text-sm font-medium">D\xE9but</label> <input type="time" id="startTime" name="startTime" class="border rounded px-2 py-1" required> </div> <div> <label for="endTime" class="block text-sm font-medium">Fin</label> <input type="time" id="endTime" name="endTime" class="border rounded px-2 py-1" required> </div> <div> <label for="status" class="block text-sm font-medium">Statut</label> <select id="status" name="status" class="border rounded px-2 py-1" required> <option value="Libre">Libre</option> <option value="Occup\xE9">Occup\xE9</option> <option value="Indisponible">Indisponible</option> </select> </div> <div> <label for="description" class="block text-sm font-medium">Description</label> <input type="text" id="description" name="description" class="border rounded px-2 py-1"> </div> <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button> <button type="button" id="cancel-edit" class="hidden bg-gray-400 text-white px-3 py-2 rounded">Annuler</button> <input type="hidden" id="planning-id" name="id"> </form> <script>
    // ...existing code...
    document.addEventListener('DOMContentLoaded', () => {
      loadPlanning();
      const form = document.getElementById('planning-form');
      const cancelBtn = document.getElementById('cancel-edit');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = form['planning-id'].value;
        const data = {
          date: form['date'].value,
          startTime: form['startTime'].value,
          endTime: form['endTime'].value,
          status: form['status'].value,
          description: form['description'].value
        };
        let method = 'POST';
        if (id) {
          data.id = id;
          method = 'PUT';
        }
        await fetch('/api/planning', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        form.reset();
        form['planning-id'].value = '';
        form.querySelector('button[type="submit"]').textContent = 'Ajouter';
        cancelBtn.classList.add('hidden');
        loadPlanning();
      });
      cancelBtn.addEventListener('click', () => {
        form.reset();
        form['planning-id'].value = '';
        form.querySelector('button[type="submit"]').textContent = 'Ajouter';
        cancelBtn.classList.add('hidden');
      });
      // \xC9dition (remplir le formulaire)
      document.addEventListener('click', (e) => {
        if (e.target && e.target.matches('button[data-edit-id]')) {
          const btn = e.target;
          const id = btn.getAttribute('data-edit-id');
          fetch('/api/planning').then(r => r.json()).then(planning => {
            const p = planning.find(x => x.id === id);
            if (p) {
              form['date'].value = p.date;
              form['startTime'].value = p.startTime;
              form['endTime'].value = p.endTime;
              form['status'].value = p.status;
              form['description'].value = p.description || '';
              form['planning-id'].value = p.id;
              form.querySelector('button[type="submit"]').textContent = 'Enregistrer';
              cancelBtn.classList.remove('hidden');
            }
          });
        }
      });
    });
    // ...existing code...
  <\/script> </div>`])), maybeRenderHead());
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/components/admin/PlanningTable.astro", void 0);

const $$Planning = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestion du planning" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold mb-4">Gestion du planning</h1> ${renderComponent($$result2, "PlanningTable", $$PlanningTable, {})} ` })}`;
}, "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/planning.astro", void 0);

const $$file = "/home/runner/work/artisan-beauty/artisan-beauty/src/pages/admin/planning.astro";
const $$url = "/admin/planning";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Planning,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
