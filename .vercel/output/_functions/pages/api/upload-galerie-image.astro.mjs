import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) return new Response("No file", { status: 400 });
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  if (!allowedExts.includes(ext)) {
    return new Response("Type de fichier non autorisé", { status: 400 });
  }
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return new Response("Fichier trop volumineux (max 5 Mo)", { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  let base = formData.get("name");
  function slugify(str) {
    return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  if (base) {
    base = slugify(base);
  } else {
    base = slugify(path.basename(file.name, ext));
  }
  const filename = `${base}${ext}`;
  const uploadDir = path.resolve(process.cwd(), "public/assets");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  return new Response(JSON.stringify({ filename }), { headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
