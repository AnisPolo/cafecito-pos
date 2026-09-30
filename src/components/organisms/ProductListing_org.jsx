import ProductDesc_mol from '../molecules/ProductDesc_mol'
import styles from './ProductListing_org.module.css'

/* Lista de productos del carrito — ref_img/1x/ProductListing_org.png */
export default function ProductListing_org({ items }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ProductDesc_mol key={item.id} item={item} />
      ))}
    </div>
  )
}
