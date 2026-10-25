import editIcon from '../../assets/svg/edit_icon.svg'
import { money } from '../../utils/money'
import styles from './ProductRow_mol.module.css'

/* Renglón de producto del panel de admin: foto, nombre, precio, lápiz para editar y "Eliminar" */
export default function ProductRow_mol({ product, onEdit, onDelete }) {
  return (
    <li className={styles.row}>
      <div className={styles.thumb}>
        <img src={product.image} alt="" />
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <div className={styles.side}>
        <button
          type="button"
          className={styles.edit}
          onClick={() => onEdit(product)}
          aria-label={`Editar ${product.name}`}
        >
          <img src={editIcon} alt="" />
        </button>
        <span className={styles.price}>{money(product.price)}</span>
        <button
          type="button"
          className={styles.delete}
          onClick={() => onDelete(product)}
          aria-label={`Eliminar ${product.name}`}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}
