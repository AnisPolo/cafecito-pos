import ProductName_atm from '../atoms/ProductName_atm'
import Price_atm from '../atoms/Price_atm'
import PlusBtn_atm from '../atoms/PlusBtn_atm'
import styles from './Product_mol.module.css'

/* Tarjeta de bebida: la foto se monta sobre la placa crema — ref_img/1x/Product_mol.png */
export default function Product_mol({ product, withPlus = true }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.photo} src={product.image} alt={product.name} />
        {withPlus && (
          <span className={styles.plus}>
            <PlusBtn_atm label={`Agregar ${product.name}`} />
          </span>
        )}
      </div>
      <div className={styles.plate}>
        <ProductName_atm>{product.name}</ProductName_atm>
        <span className={styles.price}>
          <Price_atm value={product.price} />
        </span>
      </div>
    </article>
  )
}
