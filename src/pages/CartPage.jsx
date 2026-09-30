import CartTemplate_temp from '../components/templates/CartTemplate_temp'
import { cartItems } from '../data/products'

/* ref_img/CartPage.png */
export default function CartPage() {
  return <CartTemplate_temp items={cartItems} total={140} />
}
