import Header_temp from './Header_temp'
import ProductListing_org from '../organisms/ProductListing_org'
import CartSummary_org from '../organisms/CartSummary_org'
import styles from './CartTemplate_temp.module.css'

/* Layout del carrito — ref_img/CartPage.png */
export default function CartTemplate_temp({ items, total, onRemove, onPay, payDisabled, note }) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" searchValue="Taro" />
      <main className={styles.main}>
        <ProductListing_org items={items} onRemove={onRemove} />
        <CartSummary_org total={total} onPay={onPay} disabled={payDisabled} note={note} />
      </main>
    </div>
  )
}
