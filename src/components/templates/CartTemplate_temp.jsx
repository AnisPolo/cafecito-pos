import Header_temp from './Header_temp'
import ProductListing_org from '../organisms/ProductListing_org'
import CartSummary_org from '../organisms/CartSummary_org'
import OrderConfirmation_org from '../organisms/OrderConfirmation_org'
import styles from './CartTemplate_temp.module.css'

/* Layout del carrito — ref_img/CartPage.png
   Si hay `confirmation` (pedido ya creado) se muestra el número de referencia. */
export default function CartTemplate_temp({
  items,
  total,
  onRemove,
  onPay,
  payDisabled,
  note,
  name,
  confirmation,
}) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" searchValue="Taro" />
      {confirmation ? (
        <main className={`${styles.main} ${styles.single}`}>
          <OrderConfirmation_org
            orderNumber={confirmation.orderNumber}
            total={confirmation.total}
            name={name}
          />
        </main>
      ) : (
        <main className={styles.main}>
          <ProductListing_org items={items} onRemove={onRemove} />
          <CartSummary_org total={total} onPay={onPay} disabled={payDisabled} note={note} name={name} />
        </main>
      )}
    </div>
  )
}
