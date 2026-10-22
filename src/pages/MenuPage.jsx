import { useSearchParams } from 'react-router-dom'
import MenuTemplate_temp from '../components/templates/MenuTemplate_temp'
import { useProducts } from '../hooks/useProducts'
import { matchesQuery } from '../utils/search'

function MenuPage() {
  const { products, loading, error } = useProducts()
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar el menú</p>

  const withId = (p) => ({ ...p, id: p._id })

  // el filtro (?q=) se aplica antes de agrupar por categoría
  const visible = products.filter((p) => matchesQuery(p, query))
  const hotDrinks = visible.filter((p) => p.category === 'hot').map(withId)
  const coldDrinks = visible.filter((p) => p.category === 'cold').map(withId)
  const desserts = visible.filter((p) => p.category === 'pastry').map(withId)

  /* ref_img/MenuPage.png */
  return (
    <MenuTemplate_temp
      hotDrinks={hotDrinks}
      coldDrinks={coldDrinks}
      desserts={desserts}
      query={query}
    />
  )
}

export default MenuPage
