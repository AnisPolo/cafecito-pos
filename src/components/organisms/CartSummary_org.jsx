import Total_mol from '../molecules/Total_mol'
import styles from './CartSummary_org.module.css'

/* Columna de cobro del carrito — ref_img/CartPage.png */
export default function CartSummary_org({ subtotal, discountAmount, total, onPay, disabled, note, name }) {
  return (
    <aside className={styles.summary}>
      <Total_mol
        subtotal={subtotal}
        discountAmount={discountAmount}
        total={total}
        onPay={onPay}
        disabled={disabled}
        note={note}
        name={name}
      />
    </aside>
  )
}
