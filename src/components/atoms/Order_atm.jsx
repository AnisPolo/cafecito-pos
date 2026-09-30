import cupIcon from '../../assets/svg/cofee_icon.svg'
import styles from './Order_atm.module.css'

/* Vaso del pedido con contador — ref_img/1x/order_atm.png */
export default function Order_atm({ count = 1 }) {
  return (
    <span className={styles.order}>
      <img className={styles.cup} src={cupIcon} alt="Mi pedido" />
      <span className={styles.badge}>{count}</span>
    </span>
  )
}
