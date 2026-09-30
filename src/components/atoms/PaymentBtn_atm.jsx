import styles from './PaymentBtn_atm.module.css'

/* Botón de acción principal — ref_img/1x/PaymentBtn_atm.png ("Agregar al pedido")
   y el bloque naranja de Total_mol ("Proceder al pago"). */
export default function PaymentBtn_atm({ children, shape = 'pill', block = false }) {
  return (
    <button type="button" className={`${styles.btn} ${styles[shape]} ${block ? styles.block : ''}`}>
      {children}
    </button>
  )
}
