import ReceiptName_atm from '../atoms/ReceiptName_atm'
import PaymentBtn_atm from '../atoms/PaymentBtn_atm'
import { money } from '../../utils/money'
import styles from './Total_mol.module.css'

/* Panel de cobro — ref_img/1x/Total_mol.png
   Subtotal siempre; "Descuento" solo si hay (naranja, con signo menos). */
export default function Total_mol({
  subtotal = 0,
  discountAmount = 0,
  total,
  cta = 'Proceder al pago',
  onPay,
  disabled = false,
  note,
  name,
}) {
  return (
    <section className={styles.panel}>
      <span className={styles.dot} />
      <ReceiptName_atm name={name} />
      <div className={styles.breakdown}>
        <p className={styles.row}>
          <span>Subtotal:</span>
          <span>{money(subtotal)}</span>
        </p>
        {discountAmount > 0 && (
          <p className={`${styles.row} ${styles.discount}`}>
            <span>Descuento:</span>
            <span>-{money(discountAmount)}</span>
          </p>
        )}
      </div>
      <div className={styles.total}>
        <span className={styles.label}>Total:</span>
        <span className={styles.amount}>{money(total)}</span>
      </div>
      {note && <p className={styles.note}>{note}</p>}
      <PaymentBtn_atm shape="square" block onClick={onPay} disabled={disabled}>
        {cta}
      </PaymentBtn_atm>
    </section>
  )
}
