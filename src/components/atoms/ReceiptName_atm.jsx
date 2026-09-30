import styles from './ReceiptName_atm.module.css'

/* Nombre del ticket — ref_img/1x/receiptName_atm.png */
export default function ReceiptName_atm({ placeholder = 'Nombre mi perfil' }) {
  return (
    <div className={styles.field}>
      <input type="text" placeholder={placeholder} aria-label="Nombre para el pedido" />
    </div>
  )
}
