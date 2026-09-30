import DiscountBadge_atm from '../atoms/DiscountBadge_atm'
import styles from './DiscountInfo_mol.module.css'

/* Descuento actual + pista del siguiente nivel — ref_img/ProfilePage.png */
export default function DiscountInfo_mol({ discount, hint }) {
  return (
    <div className={styles.info}>
      <p className={styles.current}>
        <span>Descuento actual:</span>
        <DiscountBadge_atm>{discount}</DiscountBadge_atm>
      </p>
      <p className={styles.hint}>{hint}</p>
    </div>
  )
}
