import Total_mol from '../molecules/Total_mol'
import styles from './CartSummary_org.module.css'

/* Columna de cobro del carrito — ref_img/CartPage.png */
export default function CartSummary_org({ total }) {
  return (
    <aside className={styles.summary}>
      <Total_mol total={total} />
    </aside>
  )
}
