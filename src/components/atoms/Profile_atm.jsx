import avatar from '../../assets/svg/avatar_icon.svg'
import styles from './Profile_atm.module.css'

/* Avatar + "Mi perfil" — ref_img/1x/profile_atm.png.
   Con `highlighted` la etiqueta va dentro de la caja naranja (CartPage / ProfilePage). */
export default function Profile_atm({ label = 'Mi perfil', highlighted = false }) {
  return (
    <span className={styles.profile}>
      <img className={styles.avatar} src={avatar} alt="" />
      <span className={`${styles.label} ${highlighted ? styles.highlighted : ''}`}>{label}</span>
    </span>
  )
}
