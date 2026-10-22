// Formatea un monto: $140 (entero) o $133.50 (con 2 decimales)
export const money = (n) => {
  const rounded = Math.round(n * 100) / 100
  return `$${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`
}
