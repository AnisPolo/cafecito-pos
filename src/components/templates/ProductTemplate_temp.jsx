import Header_temp from './Header_temp'
import ProductOptions_org from '../organisms/ProductOptions_org'
import styles from './ProductTemplate_temp.module.css'

/* Layout del detalle: foto a la izquierda, opciones a la derecha
   — ref_img/ProductPage.png */
export default function ProductTemplate_temp({ product, onMilk, onFlavor, onCream, onAdd }) {
  return (
    <div className={styles.page}>
      <Header_temp searchValue="Taro" />
      <main className={styles.main}>
        <figure className={styles.media}>
          <img src={product.image} alt={product.name} />
        </figure>
        <ProductOptions_org
          product={product}
          onMilk={onMilk}
          onFlavor={onFlavor}
          onCream={onCream}
          onAdd={onAdd}
        />
      </main>
    </div>
  )
}
