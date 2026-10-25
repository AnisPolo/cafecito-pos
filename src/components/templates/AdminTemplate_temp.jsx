import Header_temp from './Header_temp'
import ProfileCard_org from '../organisms/ProfileCard_org'
import AdminTabs_mol from '../molecules/AdminTabs_mol'
import styles from './AdminTemplate_temp.module.css'

/* Perfil del administrador — ref_img/pantallas-12.png y pantallas-15.png
   Izquierda: avatar, nombre, "Cerrar sesión" y "Agregar Producto".
   Derecha: pestañas Productos / Clientes y su lista (children).
   `actions` va a la derecha de las pestañas; `overlays` son las ventanas (formulario, confirmación). */
export default function AdminTemplate_temp({
  profile,
  onLogout,
  onAddProduct,
  tab,
  onTabChange,
  actions,
  children,
  overlays,
}) {
  return (
    <div className={styles.page}>
      <Header_temp active="perfil" />
      <main className={styles.main}>
        <ProfileCard_org profile={profile} onLogout={onLogout}>
          <button type="button" className={styles.add} onClick={onAddProduct}>
            Agregar Producto
          </button>
        </ProfileCard_org>

        <section className={styles.right}>
          <AdminTabs_mol tab={tab} onChange={onTabChange} actions={actions} />
          <div id="admin-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            {children}
          </div>
        </section>
      </main>
      {overlays}
    </div>
  )
}
