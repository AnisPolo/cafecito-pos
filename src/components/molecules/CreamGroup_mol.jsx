import Cream_atm from '../atoms/Cream_atm'
import styles from './CreamGroup_mol.module.css'

/* "Crema batida?" + toggle — ref_img/ProductPage.png */
export default function CreamGroup_mol({ label = 'Crema batida?', active = false }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.label}>{label}</h3>
      <Cream_atm active={active} />
    </div>
  )
}
