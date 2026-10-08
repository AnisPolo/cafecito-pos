import Price_atm from '../atoms/Price_atm'
import styles from './ProductDesc_mol.module.css'

const LABELS = { full: 'Entera', deslactosada: 'Deslactosada' }

/* Renglón del carrito — ref_img/1x/productDesc_mol.png */
export default function ProductDesc_mol({ item, onRemove }) {
  const quantity = item.quantity || 1
  return (
    <article className={styles.row}>
      <div className={styles.thumb}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <h3 className={styles.name}>
            {item.name}
            {quantity > 1 ? ` x${quantity}` : ''}
          </h3>
          <Price_atm value={item.price * quantity} size="md" />
        </header>
        <dl className={styles.specs}>
          {item.milk && (
            <div className={styles.spec}>
              <dt>Leche:</dt>
              <dd>{LABELS[item.milk] || item.milk}</dd>
            </div>
          )}
          {item.flavor && (
            <div className={styles.spec}>
              <dt>Sabor:</dt>
              <dd>{item.flavor}</dd>
            </div>
          )}
          {item.milk && (
            <div className={`${styles.spec} ${styles.specRight}`}>
              <dt>Crema batida:</dt>
              <dd>{item.whippedCream ? 'Sí' : 'No'}</dd>
            </div>
          )}
        </dl>
        {onRemove && (
          <button type="button" className={styles.remove} onClick={onRemove}>
            Quitar
          </button>
        )}
      </div>
    </article>
  )
}
