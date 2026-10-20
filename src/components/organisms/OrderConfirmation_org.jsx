import { Link } from 'react-router-dom'
import styles from './OrderConfirmation_org.module.css'

/* Confirmación de pedido: muestra el número de referencia (sirve para invitados) */
export default function OrderConfirmation_org({ orderNumber, total, name }) {
  return (
    <section className={styles.box} aria-live="polite">
      <h2 className={styles.title}>¡Pedido recibido!</h2>
      <p className={styles.label}>Número de referencia</p>
      <p className={styles.number}>{orderNumber}</p>
      <p className={styles.detail}>
        {name} · Total: ${total}
      </p>
      <p className={styles.hint}>Guárdalo: lo necesitarás para recoger tu pedido.</p>
      <Link className={styles.back} to="/menu">
        Volver al menú
      </Link>
    </section>
  )
}
