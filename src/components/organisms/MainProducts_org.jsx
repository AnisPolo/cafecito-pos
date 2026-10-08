import { Link } from 'react-router-dom'
import Product_mol from '../molecules/Product_mol'
import styles from './MainProducts_org.module.css'

/* Banda olive con los destacados; en el ref se recortan contra los bordes
   — ref_img/1x/mainProducts_org.png */
export default function MainProducts_org({ products }) {
  return (
    <section className={styles.band}>
      <div className={styles.track}>
        {products.map((product) => (
          <Link className={styles.item} key={product.id} to={`/producto/${product.id}`}>
            <Product_mol product={product} withPlus={false} />
          </Link>
        ))}
      </div>
    </section>
  )
}
