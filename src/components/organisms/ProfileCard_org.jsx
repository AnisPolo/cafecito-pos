import Avatar_atm from '../atoms/Avatar_atm'
import ProductName_atm from '../atoms/ProductName_atm'
import DiscountInfo_mol from '../molecules/DiscountInfo_mol'
import styles from './ProfileCard_org.module.css'

/* Columna izquierda del perfil — ref_img/ProfilePage.png */
export default function ProfileCard_org({ profile }) {
  return (
    <section className={styles.card}>
      <Avatar_atm />
      <h1 className={styles.name}>
        <ProductName_atm tone="brown" size="hero">
          {profile.name}
        </ProductName_atm>
      </h1>
      <DiscountInfo_mol discount={profile.discount} hint={profile.nextDiscountHint} />
    </section>
  )
}
