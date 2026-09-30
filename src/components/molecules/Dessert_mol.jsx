import ProductName_atm from '../atoms/ProductName_atm'
import PlusBtn_atm from '../atoms/PlusBtn_atm'
import beans from '../../assets/svg/beans.svg'
import styles from './Dessert_mol.module.css'

/* Tarjeta de postre, horizontal y sobre fondo olive — ref_img/1x/Dessert_mol.png */
export default function Dessert_mol({ product }) {
  return (
    <article className={styles.card}>
      <img className={styles.beans} src={beans} alt="" />
      <h3 className={styles.name}>
        <ProductName_atm tone="brown" size="lg">
          {product.name}
        </ProductName_atm>
      </h3>
      <img className={styles.photo} src={product.image} alt={product.name} />
      <span className={styles.plus}>
        <PlusBtn_atm label={`Agregar ${product.name}`} />
      </span>
    </article>
  )
}
