import styles from './DiscountBadge_atm.module.css'

/* Caja naranja del descuento — ref_img/ProfilePage.png */
export default function DiscountBadge_atm({ children }) {
  return <span className={styles.badge}>{children}</span>
}
