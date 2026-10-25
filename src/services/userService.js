// Solo admin: lista de clientes con su descuento actual (consulta).
export async function getClients(token) {
  const res = await fetch("/api/user/clients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || "No se pudieron cargar los clientes");
    error.status = res.status;
    throw error;
  }
  return data;
}
