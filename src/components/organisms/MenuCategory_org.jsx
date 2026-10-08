import { Link } from 'react-router-dom'
import SectionTitle_atm from '../atoms/SectionTitle_atm'
import Product_mol from '../molecules/Product_mol'
import styles from './MenuCategory_org.module.css'

/* Panel de categoría del menú — ref_img/MenuPage.png
   tone: "hot" (ámbar) | "cold" (sage) */
export default function MenuCategory_org({ title, products, tone = 'hot' }) {
  return (
    <section className={`${styles.panel} ${styles[tone]}`}>
      <SectionTitle_atm>{title}</SectionTitle_atm>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link className={styles.item} key={product.id} to={`/producto/${product.id}`}>
            <Product_mol product={product} />
          </Link>
        ))}
      </div>
    </section>
  )
}
