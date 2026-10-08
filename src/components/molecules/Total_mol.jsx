import ReceiptName_atm from '../atoms/ReceiptName_atm'
import PaymentBtn_atm from '../atoms/PaymentBtn_atm'
import styles from './Total_mol.module.css'

/* Panel de cobro — ref_img/1x/Total_mol.png */
export default function Total_mol({ total, cta = 'Proceder al pago', onPay, disabled = false, note }) {
  return (
    <section className={styles.panel}>
      <span className={styles.dot} />
      <ReceiptName_atm />
      <div className={styles.total}>
        <span className={styles.label}>Total:</span>
        <span className={styles.amount}>${total}</span>
      </div>
      {note && <p className={styles.note}>{note}</p>}
      <PaymentBtn_atm shape="square" block onClick={onPay} disabled={disabled}>
        {cta}
      </PaymentBtn_atm>
    </section>
  )
}
