// Texto del siguiente tramo de descuento. `next` viene de /api/user/me y /api/user/clients:
// { discountPercentage, purchasesNeeded } o null si ya está en el máximo.
export const discountHint = (next, maxText = '¡Ya tienes el descuento máximo!') =>
  next
    ? `Sube a ${next.discountPercentage}% registrando ${next.purchasesNeeded} ${
        next.purchasesNeeded === 1 ? 'compra' : 'compras'
      } más!`
    : maxText
