import Header_temp from './Header_temp'
import ProductListing_org from '../organisms/ProductListing_org'
import CartSummary_org from '../organisms/CartSummary_org'
import styles from './CartTemplate_temp.module.css'

/* Layout del carrito — ref_img/CartPage.png */
export default function CartTemplate_temp({ items, total }) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" searchValue="Taro" orderCount={items.length} />
      <main className={styles.main}>
        <ProductListing_org items={items} />
        <CartSummary_org total={total} />
      </main>
    </div>
  )
}
