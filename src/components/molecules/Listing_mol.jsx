import styles from './Listing_mol.module.css'

/* Renglón de historial — ref_img/1x/listing_mol.png */
export default function Listing_mol({ order }) {
  return (
    <li className={styles.row}>
      <span>{order.date}</span>
      <span>${order.amount}</span>
    </li>
  )
}
