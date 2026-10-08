import ProductName_atm from '../atoms/ProductName_atm'
import OptionGroup_mol from '../molecules/OptionGroup_mol'
import FlavorGroup_mol from '../molecules/FlavorGroup_mol'
import CreamGroup_mol from '../molecules/CreamGroup_mol'
import PaymentBtn_atm from '../atoms/PaymentBtn_atm'
import styles from './ProductOptions_org.module.css'

/* Columna de personalización del producto — ref_img/ProductPage.png
   Los grupos que el producto no tiene (p. ej. postres) no se muestran. */
export default function ProductOptions_org({ product, onMilk, onFlavor, onCream, onAdd }) {
  return (
    <section className={styles.options}>
      <h1 className={styles.title}>
        <ProductName_atm tone="brown" size="hero">
          {product.name}
        </ProductName_atm>
      </h1>
      {product.milkOptions?.length > 0 && (
        <OptionGroup_mol label="Leche:" options={product.milkOptions} onSelect={onMilk} />
      )}
      {product.flavorOptions?.length > 0 && (
        <FlavorGroup_mol label="Sabor:" options={product.flavorOptions} onSelect={onFlavor} />
      )}
      {product.hasCream && <CreamGroup_mol active={product.whippedCream} onToggle={onCream} />}
      <div className={styles.action}>
        <PaymentBtn_atm onClick={onAdd}>Agregar al pedido</PaymentBtn_atm>
      </div>
    </section>
  )
}
