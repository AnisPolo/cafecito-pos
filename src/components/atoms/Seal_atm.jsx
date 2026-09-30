import sealFilled from '../../assets/svg/seal.svg'
import sealEmpty from '../../assets/svg/seal_circle.svg'
import styles from './Seal_atm.module.css'

/* Sello de fidelidad — ref_img/1x/Seal_atm.png */
export default function Seal_atm({ filled = false }) {
  return (
    <img
      className={styles.seal}
      src={filled ? sealFilled : sealEmpty}
      alt={filled ? 'Sello obtenido' : 'Sello pendiente'}
    />
  )
}
