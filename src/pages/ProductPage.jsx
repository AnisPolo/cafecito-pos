import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductTemplate_temp from '../components/templates/ProductTemplate_temp'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

const LABELS = { full: 'Entera', deslactosada: 'Deslactosada' }
const label = (v) => LABELS[v] || v.charAt(0).toUpperCase() + v.slice(1)

const toOptions = (list = [], current) =>
  list.map((v) => ({ id: v, label: label(v), selected: v === current }))

/* ref_img/ProductPage.png */
export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [milk, setMilk] = useState('')
  const [flavor, setFlavor] = useState('')
  const [cream, setCream] = useState(false)

  useEffect(() => {
    setProduct(null)
    setError(null)
    getProductById(id)
      .then((p) => {
        setProduct(p)
        setMilk(p.milk?.[0] || '')
        setFlavor(p.flavor?.[0] || '')
        setCream(false)
      })
      .catch(setError)
  }, [id])

  if (error) return <p>No se encontró el producto</p>
  if (!product) return <p>Cargando...</p>

  const view = {
    ...product,
    milkOptions: toOptions(product.milk, milk),
    flavorOptions: toOptions(product.flavor, flavor),
    hasCream: product.category !== 'pastry',
    whippedCream: cream,
  }

  const handleAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      milk,
      size: product.size?.[1] || product.size?.[0] || '',
      flavor,
      whippedCream: view.hasCream && cream,
    })
    navigate('/carrito')
  }

  return (
    <ProductTemplate_temp
      product={view}
      onMilk={setMilk}
      onFlavor={setFlavor}
      onCream={() => setCream((c) => !c)}
      onAdd={handleAdd}
    />
  )
}
