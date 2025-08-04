import db from '../../chunks/db_DLs-JeiT.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const reservations = db.prepare("SELECT * FROM reservations ORDER BY date DESC, time DESC").all();
    return new Response(JSON.stringify(reservations), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reservations" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { nom, prenom, email, telephone, serviceId, formationId, date, time, notes, status = "pending" } = data;
    let userId = 1;
    if (email) {
      try {
        const existingUser = db.prepare("SELECT id FROM utilisateurs WHERE email = ?").get(email);
        if (existingUser) {
          userId = existingUser.id;
        } else {
          const userStmt = db.prepare("INSERT INTO utilisateurs (nom, email, role, password) VALUES (?, ?, ?, ?)");
          const userResult = userStmt.run(`${prenom || ""} ${nom || ""}`.trim(), email, "client", "temp");
          userId = userResult.lastInsertRowid;
        }
      } catch (error) {
        console.error("Error creating/finding user:", error);
      }
    }
    const stmt = db.prepare(`
      INSERT INTO reservations (userId, serviceId, date, time, status, notes) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(userId, serviceId || null, date, time, status, notes || null);
    const newReservation = {
      id: result.lastInsertRowid,
      userId,
      serviceId: serviceId || null,
      date,
      time,
      status,
      notes: notes || null
    };
    return new Response(JSON.stringify(newReservation), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return new Response(JSON.stringify({ error: "Failed to create reservation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const data = await request.json();
    const { id, ...updates } = data;
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const fields = Object.keys(updates).filter((key) => key !== "id");
    if (fields.length === 0) {
      return new Response(JSON.stringify({ error: "No fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => updates[field]);
    const stmt = db.prepare(`UPDATE reservations SET ${setClause} WHERE id = ?`);
    stmt.run(...values, id);
    const updated = db.prepare("SELECT * FROM reservations WHERE id = ?").get(id);
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return new Response(JSON.stringify({ error: "Failed to update reservation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ request }) => {
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const stmt = db.prepare("DELETE FROM reservations WHERE id = ?");
    stmt.run(id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return new Response(JSON.stringify({ error: "Failed to delete reservation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
