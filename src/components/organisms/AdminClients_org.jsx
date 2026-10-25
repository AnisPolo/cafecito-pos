import ClientRow_mol from '../molecules/ClientRow_mol'
import styles from './AdminList.module.css'

/* Lista de clientes del admin (solo consulta del descuento).
   `total` = clientes sin filtrar, para distinguir "no hay clientes" de "ninguno coincide". */
export default function AdminClients_org({ clients, total, loading, error, query }) {
  if (loading) return <p className={styles.empty}>Cargando clientes...</p>
  if (error) return <p className={styles.empty} role="alert">{error}</p>
  if (total === 0) return <p className={styles.empty}>Todavía no hay clientes registrados.</p>
  if (clients.length === 0) {
    return <p className={styles.empty}>No encontramos clientes para «{query}».</p>
  }
  return (
    <ul className={styles.list}>
      {clients.map((client) => (
        <ClientRow_mol key={client.id} client={client} />
      ))}
    </ul>
  )
}
