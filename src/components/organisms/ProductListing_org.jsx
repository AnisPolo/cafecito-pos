import ProductDesc_mol from '../molecules/ProductDesc_mol'
import styles from './ProductListing_org.module.css'

/* Lista de productos del carrito — ref_img/1x/ProductListing_org.png */
export default function ProductListing_org({ items, onRemove }) {
  if (items.length === 0) {
    return <p className={styles.list}>Tu pedido está vacío.</p>
  }
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <ProductDesc_mol
          key={`${item.productId}-${index}`}
          item={item}
          onRemove={() => onRemove?.(index)}
        />
      ))}
    </div>
  )
}
