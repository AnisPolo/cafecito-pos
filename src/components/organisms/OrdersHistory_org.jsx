import Listing_mol from '../molecules/Listing_mol'
import styles from './OrdersHistory_org.module.css'

/* Últimos pedidos — ref_img/1x/listing_mol.png
   onSelect(id) abre el ticket del pedido. */
export default function OrdersHistory_org({ title = 'Ultimos pedidos:', orders, onSelect }) {
  return (
    <section className={styles.history}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {orders.map((order) => (
          <Listing_mol key={order.id} order={order} onSelect={onSelect} />
        ))}
      </ul>
    </section>
  )
}
