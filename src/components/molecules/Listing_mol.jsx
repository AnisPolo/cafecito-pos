import styles from './Listing_mol.module.css'

/* Renglón de historial — ref_img/1x/listing_mol.png
   Si recibe onSelect, la fila es un botón que abre el ticket del pedido. */
export default function Listing_mol({ order, onSelect }) {
  const content = (
    <>
      <span>{order.date}</span>
      <span>${order.amount}</span>
    </>
  )

  return (
    <li className={styles.item}>
      {onSelect ? (
        <button
          type="button"
          className={`${styles.row} ${styles.button}`}
          onClick={() => onSelect(order.id)}
          aria-label={`Ver ticket del pedido del ${order.date}, $${order.amount}`}
        >
          {content}
        </button>
      ) : (
        <div className={styles.row}>{content}</div>
      )}
    </li>
  )
}
