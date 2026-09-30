import Price_atm from '../atoms/Price_atm'
import styles from './ProductDesc_mol.module.css'

/* Renglón del carrito — ref_img/1x/productDesc_mol.png */
export default function ProductDesc_mol({ item }) {
  return (
    <article className={styles.row}>
      <div className={styles.thumb}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <h3 className={styles.name}>{item.name}</h3>
          <Price_atm value={item.price} size="md" />
        </header>
        <dl className={styles.specs}>
          <div className={styles.spec}>
            <dt>Leche:</dt>
            <dd>{item.milk}</dd>
          </div>
          <div className={styles.spec}>
            <dt>Sabor:</dt>
            <dd>{item.flavor}</dd>
          </div>
          <div className={`${styles.spec} ${styles.specRight}`}>
            <dt>Crema batida:</dt>
            <dd>{item.cream}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
