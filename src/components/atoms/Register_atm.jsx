import arrow from '../../assets/svg/arrow_right_brown.svg'
import styles from './Register_atm.module.css'

/* Botón ámbar del banner — ref_img/1x/Register_atm.png */
export default function Register_atm({ children = 'Registrate' }) {
  return (
    <button type="button" className={styles.btn}>
      <span>{children}</span>
      <img className={styles.arrow} src={arrow} alt="" />
    </button>
  )
}
