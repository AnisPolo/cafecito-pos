import SectionTitle_atm from '../atoms/SectionTitle_atm'
import Dessert_mol from '../molecules/Dessert_mol'
import styles from './Desserts_org.module.css'

/* Sección de postres — ref_img/MenuPage.png */
export default function Desserts_org({ title = 'Postres', products }) {
  return (
    <section className={styles.section}>
      <SectionTitle_atm tone="green">{title}</SectionTitle_atm>
      <div className={styles.grid}>
        {products.map((product) => (
          <Dessert_mol key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
