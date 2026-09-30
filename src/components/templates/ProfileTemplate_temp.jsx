import Header_temp from './Header_temp'
import ProfileCard_org from '../organisms/ProfileCard_org'
import SealsBoard_org from '../organisms/SealsBoard_org'
import OrdersHistory_org from '../organisms/OrdersHistory_org'
import styles from './ProfileTemplate_temp.module.css'

/* Layout del perfil — ref_img/ProfilePage.png */
export default function ProfileTemplate_temp({ profile, orders }) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" searchValue="Taro" />
      <main className={styles.main}>
        <ProfileCard_org profile={profile} />
        <div className={styles.right}>
          <SealsBoard_org total={profile.seals.total} filled={profile.seals.filled} />
          <OrdersHistory_org orders={orders} />
        </div>
      </main>
    </div>
  )
}
