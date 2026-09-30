import ProfileTemplate_temp from '../components/templates/ProfileTemplate_temp'
import { profile, lastOrders } from '../data/products'

/* ref_img/ProfilePage.png */
export default function ProfilePage() {
  return <ProfileTemplate_temp profile={profile} orders={lastOrders} />
}
