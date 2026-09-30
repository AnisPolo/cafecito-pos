import logo from '../../assets/img/logo.png'
import styles from './Logo_atm.module.css'

/* Logotipo Coffee House — ref_img/1x/logo.png */
export default function Logo_atm({ size = 'md' }) {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <img src={logo} alt="Coffee House" />
    </div>
  )
}
