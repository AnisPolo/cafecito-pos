import milk from '../../assets/svg/milk_icon.svg'
import styles from './Cream_atm.module.css'

/* Toggle de crema batida — ref_img/1x/cream_atm.png */
export default function Cream_atm({ active = false, onClick }) {
  return (
    <button type="button" className={styles.toggle} aria-pressed={active} onClick={onClick}>
      <img className={styles.icon} src={milk} alt="" />
      <span className={styles.label}>{active ? 'si' : 'no'}</span>
    </button>
  )
}
