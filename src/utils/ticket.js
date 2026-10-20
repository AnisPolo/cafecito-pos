// Arma los datos del ticket (OrderReceipt_org) a partir de las líneas de un pedido.
//  items: [{ name, price, quantity, milk, flavor, whippedCream, ... }]
//  total: lo que cobró el servidor
//  discountPercent: porcentaje de descuento aplicado (0, 5, 10 o 15)
export function buildTicket({ orderNumber, total, discountPercent = 0, items }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return {
    orderNumber,
    total,
    discountAmount: Math.max(subtotal - total, 0),
    items: items.map((i) => ({
      ...i,
      discount: (i.price * i.quantity * discountPercent) / 100, // parte del descuento de este producto
    })),
  }
}
