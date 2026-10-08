const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export async function createCart(items, token) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      items: items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
        milk: i.milk,
        size: i.size,
        flavor: i.flavor,
        whippedCream: i.whippedCream,
      })),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || "No se pudo crear el pedido");
    error.status = res.status;
    throw error;
  }
  return data;
}

export async function getMyCarts(token) {
  const res = await fetch("/api/cart", { headers: authHeaders(token) });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) {
    const error = new Error(data.message || "No se pudieron cargar los pedidos");
    error.status = res.status;
    throw error;
  }
  return data;
}
