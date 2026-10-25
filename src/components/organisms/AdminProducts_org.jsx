import ProductRow_mol from '../molecules/ProductRow_mol'
import styles from './AdminList.module.css'

/* Lista de productos del admin: cada uno se puede editar o eliminar (ocultar) */
export default function AdminProducts_org({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className={styles.empty}>Todavía no hay productos. Usa «Agregar Producto» para crear el primero.</p>
  }
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <ProductRow_mol key={product._id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
