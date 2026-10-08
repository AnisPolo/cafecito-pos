import ProductName_atm from '../atoms/ProductName_atm'
import PlusBtn_atm from '../atoms/PlusBtn_atm'
import beans from '../../assets/svg/beans.svg'
import { useCart } from '../../context/CartContext'
import styles from './Dessert_mol.module.css'

/* Tarjeta de postre, horizontal y sobre fondo olive — ref_img/1x/Dessert_mol.png
   Los postres no tienen opciones: el "+" los agrega directo al pedido. */
export default function Dessert_mol({ product }) {
  const { addItem } = useCart()

  const handleAdd = () =>
    addItem({
      productId: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      milk: '',
      size: '',
      flavor: '',
      whippedCream: false,
    })

  return (
    <article className={styles.card}>
      <img className={styles.beans} src={beans} alt="" />
      <h3 className={styles.name}>
        <ProductName_atm tone="brown" size="lg">
          {product.name}
        </ProductName_atm>
      </h3>
      <img className={styles.photo} src={product.image} alt={product.name} />
      <span className={styles.plus}>
        <PlusBtn_atm label={`Agregar ${product.name}`} onClick={handleAdd} />
      </span>
    </article>
  )
}
