import Header_temp from './Header_temp'
import ProductListing_org from '../organisms/ProductListing_org'
import CartSummary_org from '../organisms/CartSummary_org'
import OrderReceipt_org from '../organisms/OrderReceipt_org'
import styles from './CartTemplate_temp.module.css'

/* Layout del carrito — ref_img/CartPage.png
   Si hay `confirmation` (pedido ya creado) el ticket aparece en una ventana encima. */
export default function CartTemplate_temp({
  items,
  subtotal,
  discountAmount,
  total,
  onRemove,
  onPay,
  payDisabled,
  note,
  name,
  confirmation,
  onCloseConfirmation,
}) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" />
      <main className={styles.main}>
        <ProductListing_org items={items} onRemove={onRemove} />
        <CartSummary_org
          subtotal={subtotal}
          discountAmount={discountAmount}
          total={total}
          onPay={onPay}
          disabled={payDisabled}
          note={note}
          name={name}
        />
      </main>
      {confirmation && (
        <OrderReceipt_org
          orderNumber={confirmation.orderNumber}
          name={name}
          items={confirmation.items}
          discountAmount={confirmation.discountAmount}
          total={confirmation.total}
          onClose={onCloseConfirmation}
        />
      )}
    </div>
  )
}
