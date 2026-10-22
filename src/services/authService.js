// Mensajes del servidor traducidos; los que no estén aquí se muestran tal cual
const MESSAGES = {
  "Email already registered": "Este correo ya está registrado",
  "Password must be at least 8 characters": "La contraseña debe tener al menos 8 caracteres",
  "Name is required": "El nombre es obligatorio",
  "A valid email is required": "Escribe un correo válido",
  "Invalid credentials": "Correo o contraseña incorrectos",
  "Email and password are required": "Escribe tu correo y tu contraseña",
};

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(MESSAGES[data.message] || data.message || "No se pudo completar la solicitud");
  }
  return data;
}

export function login(email, password) {
  return post("/api/user/login", { email, password }); // { token, user }
}

export function register(name, email, password) {
  return post("/api/user/register", { name, email, password });
}

export async function getMe(token) {
  const res = await fetch("/api/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || "No se pudo cargar tu perfil");
    error.status = res.status;   // para detectar el 401 (token vencido)
    throw error;
  }
  return data;
}

