async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "No se pudo completar la solicitud");
  return data;
}

export function login(email, password) {
  return post("/api/user/login", { email, password }); // { token, user }
}

export function register(name, email, password) {
  return post("/api/user/register", { name, email, password });
}
