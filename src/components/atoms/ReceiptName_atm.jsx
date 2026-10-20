import styles from './ReceiptName_atm.module.css'

/* Nombre del ticket — ref_img/1x/receiptName_atm.png
   Solo lectura: muestra el nombre del usuario con sesión o "Invitado". */
export default function ReceiptName_atm({ name = 'Invitado' }) {
  return (
    <div className={styles.field}>
      <p className={styles.name} aria-label="Nombre para el pedido">
        {name}
      </p>
    </div>
  )
}
