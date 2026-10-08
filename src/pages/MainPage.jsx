import MainTemplate_temp from '../components/templates/MainTemplate_temp'
import { useProducts } from '../hooks/useProducts'
import { discountBanner, contactLinks } from '../data/products'

/* ref_img/MainPage.png — los destacados salen de la BD */
export default function MainPage() {
  const { products, loading, error } = useProducts()

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar los productos</p>

  const featured = products
    .filter((p) => p.category !== 'pastry')
    .slice(0, 5)
    .map((p) => ({ ...p, id: p._id }))

  return (
    <MainTemplate_temp
      products={featured}
      banner={discountBanner}
      contactLinks={contactLinks}
    />
  )
}
