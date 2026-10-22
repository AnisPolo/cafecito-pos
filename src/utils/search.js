// Quita acentos y mayúsculas para comparar textos
export const normalize = (s = '') =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

// Un producto coincide si el texto está en su nombre o en alguno de sus sabores
export const matchesQuery = (product, query) => {
  const q = normalize(query)
  if (!q) return true
  return [product.name, ...(product.flavor ?? [])].some((t) => normalize(t).includes(q))
}
