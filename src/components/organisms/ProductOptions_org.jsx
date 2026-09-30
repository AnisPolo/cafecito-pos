import ProductName_atm from '../atoms/ProductName_atm'
import OptionGroup_mol from '../molecules/OptionGroup_mol'
import FlavorGroup_mol from '../molecules/FlavorGroup_mol'
import CreamGroup_mol from '../molecules/CreamGroup_mol'
import PaymentBtn_atm from '../atoms/PaymentBtn_atm'
import styles from './ProductOptions_org.module.css'

/* Columna de personalización del producto — ref_img/ProductPage.png */
export default function ProductOptions_org({ product }) {
  return (
    <section className={styles.options}>
      <h1 className={styles.title}>
        <ProductName_atm tone="brown" size="hero">
          {product.name}
        </ProductName_atm>
      </h1>
      <OptionGroup_mol label="Leche:" options={product.milkOptions} />
      <FlavorGroup_mol label="Sabor:" options={product.flavorOptions} />
      <CreamGroup_mol active={product.whippedCream} />
      <div className={styles.action}>
        <PaymentBtn_atm>Agregar al pedido</PaymentBtn_atm>
      </div>
    </section>
  )
}
