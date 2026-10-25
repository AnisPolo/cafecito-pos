import Avatar_atm from '../atoms/Avatar_atm'
import ProductName_atm from '../atoms/ProductName_atm'
import styles from './ProfileCard_org.module.css'

/* Columna izquierda del perfil — ref_img/pantallas-09.png (con "Cerrar sesión")
   children: lo que va debajo (cliente: descuento actual; admin: botón "Agregar Producto") */
export default function ProfileCard_org({ profile, onLogout, children }) {
  return (
    <section className={styles.card}>
      <Avatar_atm />
      <h1 className={styles.name}>
        <ProductName_atm tone="brown" size="hero">
          {profile.name}
        </ProductName_atm>
      </h1>
      {onLogout && (
        <button type="button" className={styles.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
      )}
      {children}
    </section>
  )
}
