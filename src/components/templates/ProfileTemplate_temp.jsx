import Header_temp from './Header_temp'
import ProfileCard_org from '../organisms/ProfileCard_org'
import DiscountInfo_mol from '../molecules/DiscountInfo_mol'
import SealsBoard_org from '../organisms/SealsBoard_org'
import OrdersHistory_org from '../organisms/OrdersHistory_org'
import OrderReceipt_org from '../organisms/OrderReceipt_org'
import styles from './ProfileTemplate_temp.module.css'

/* Layout del perfil — ref_img/ProfilePage.png
   Si hay `receipt` (pedido elegido del historial) el ticket aparece en una ventana encima. */
export default function ProfileTemplate_temp({
  profile,
  orders,
  onLogout,
  onSelectOrder,
  receipt,
  onCloseReceipt,
}) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" />
      <main className={styles.main}>
        <ProfileCard_org profile={profile} onLogout={onLogout}>
          <DiscountInfo_mol discount={profile.discount} hint={profile.nextDiscountHint} />
        </ProfileCard_org>
        <div className={styles.right}>
          <SealsBoard_org total={profile.seals.total} filled={profile.seals.filled} />
          <OrdersHistory_org orders={orders} onSelect={onSelectOrder} />
        </div>
      </main>
      {receipt && (
        <OrderReceipt_org
          orderNumber={receipt.orderNumber}
          name={profile.name}
          items={receipt.items}
          discountAmount={receipt.discountAmount}
          total={receipt.total}
          onClose={onCloseReceipt}
        />
      )}
    </div>
  )
}
