const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Mensajes del servidor traducidos
const MESSAGES = {
  "Invalid product in cart": "Algún producto de tu pedido ya no está disponible. Quítalo e inténtalo de nuevo.",
  "Cart is empty": "Tu pedido está vacío.",
};

export async function createCart(items, token) {
  // sin token el pedido se registra como invitado
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: token
      ? authHeaders(token)
      : { "Content-Type": "application/json" },
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
    const error = new Error(MESSAGES[data.message] || data.message || "No se pudo crear el pedido");
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
