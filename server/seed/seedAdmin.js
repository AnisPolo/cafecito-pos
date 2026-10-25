import bcrypt from "bcrypt";
import connectDB, { disconnectDB } from "../config/db.js";
import User from "../models/User.js";

// Crea (o actualiza) el usuario administrador de prueba. Se puede correr varias veces.
// Correo y contraseña se pueden cambiar con ADMIN_EMAIL y ADMIN_PASSWORD en el .env.
const DEFAULT_EMAIL = "admin@cafecito.com";
const DEFAULT_PASSWORD = "Admin12345";

const email = (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

if (process.env.NODE_ENV === "production" && password === DEFAULT_PASSWORD) {
  console.error("En producción define ADMIN_PASSWORD: no se usa la contraseña de prueba.");
  process.exit(1);
}
if (password.length < 8) {
  console.error("ADMIN_PASSWORD debe tener al menos 8 caracteres.");
  process.exit(1);
}

await connectDB();

const hash = await bcrypt.hash(password, 10);
const existing = await User.findOne({ email });

if (existing) {
  existing.role = "admin";
  existing.password = hash;
  await existing.save();
  console.log(`Admin actualizado: ${email}`);
} else {
  await User.create({ name: "Admin", email, password: hash, role: "admin", discountPercentage: 0 });
  console.log(`Admin creado: ${email}`);
}

// la contraseña solo se muestra si es la de prueba (una propia del .env no se imprime)
console.log(password === DEFAULT_PASSWORD ? `Entra con: ${email} / ${password}` : `Entra con: ${email} y la contraseña de ADMIN_PASSWORD`);
await disconnectDB();
