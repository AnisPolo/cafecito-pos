import avatar from '../../assets/svg/avatar_icon.svg'
import styles from './Avatar_atm.module.css'

/* Avatar grande de la página de perfil — ref_img/ProfilePage.png */
export default function Avatar_atm({ alt = 'Foto de perfil' }) {
  return <img className={styles.avatar} src={avatar} alt={alt} />
}
