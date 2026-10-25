import styles from './AdminTabs_mol.module.css'

const TABS = [
  { id: 'products', label: 'Productos' },
  { id: 'clients', label: 'Clientes' },
]

/* Pestañas Productos / Clientes del admin. `actions` es lo que va a la derecha
   ("+" en Productos, buscador en Clientes). */
export default function AdminTabs_mol({ tab, onChange, actions }) {
  return (
    <div className={styles.bar}>
      <div className={styles.tabs} role="tablist" aria-label="Administración">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="admin-panel"
            className={`${styles.tab} ${tab === t.id ? styles.active : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.actions}>{actions}</div>
    </div>
  )
}
