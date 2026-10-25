import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminTemplate_temp from '../components/templates/AdminTemplate_temp'
import AdminProducts_org from '../components/organisms/AdminProducts_org'
import AdminClients_org from '../components/organisms/AdminClients_org'
import ProductForm_org from '../components/organisms/ProductForm_org'
import ConfirmDialog_org from '../components/organisms/ConfirmDialog_org'
import SearchField_atm from '../components/atoms/SearchField_atm'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import { createProduct, updateProduct, deleteProduct } from '../services/productService'
import { getClients } from '../services/userService'
import { normalize } from '../utils/search'
import styles from './AdminProfilePage.module.css'

/* ref_img/pantallas-12.png y pantallas-15.png — perfil del administrador:
   pestaña Productos (crear, editar, eliminar) y pestaña Clientes (consultar su descuento). */
export default function AdminProfilePage({ me }) {
  const { token, logout } = useAuth()
  const { clear } = useCart()
  const navigate = useNavigate()
  const { products, loading, error, reload } = useProducts()

  const [tab, setTab] = useState('products')
  const [form, setForm] = useState(null) // null | { product: null (crear) | {...} (editar) }
  const [toDelete, setToDelete] = useState(null)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')

  const [clients, setClients] = useState(null) // null = aún no cargados
  const [clientsError, setClientsError] = useState('')
  const [query, setQuery] = useState('')

  // la sesión venció: se cierra y se va al login
  const expire = () => {
    logout()
    navigate('/login')
  }

  // los clientes se piden cada vez que se abre la pestaña (sus compras pueden haber cambiado)
  useEffect(() => {
    if (tab !== 'clients') return
    let current = true
    setClientsError('')
    getClients(token)
      .then((list) => current && setClients(list))
      .catch((err) => {
        if (!current) return
        if (err.status === 401) expire()
        else setClientsError(err.message)
      })
    return () => {
      current = false
    }
  }, [tab])

  const openForm = (product = null) => {
    setActionError('')
    setForm({ product })
  }
  const closeForm = () => {
    if (!busy) setForm(null)
  }

  const run = async (action, onDone) => {
    setBusy(true)
    setActionError('')
    try {
      await action()
      await reload()
      onDone()
    } catch (err) {
      if (err.status === 401) expire()
      else setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleSave = (data) =>
    run(
      () => (form.product ? updateProduct(form.product._id, data, token) : createProduct(data, token)),
      () => setForm(null)
    )

  const handleConfirmDelete = () =>
    run(() => deleteProduct(toDelete._id, token), () => setToDelete(null))

  const handleLogout = () => {
    logout()
    clear()
    navigate('/')
  }

  // filtro de clientes: por nombre o correo, sin importar mayúsculas ni acentos
  const q = normalize(query)
  const allClients = clients ?? []
  const visibleClients = q
    ? allClients.filter((c) => normalize(c.name).includes(q) || normalize(c.email).includes(q))
    : allClients

  const actions =
    tab === 'products' ? (
      <button
        type="button"
        className={styles.plus}
        onClick={() => openForm()}
        aria-label="Agregar producto"
      >
        +
      </button>
    ) : (
      <SearchField_atm
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar cliente"
        label="Buscar clientes"
      />
    )

  let content
  if (tab === 'products') {
    if (loading) content = <p className={styles.note}>Cargando productos...</p>
    else if (error) content = <p className={styles.note} role="alert">No se pudieron cargar los productos</p>
    else content = <AdminProducts_org products={products} onEdit={openForm} onDelete={setToDelete} />
  } else {
    content = (
      <AdminClients_org
        clients={visibleClients}
        total={allClients.length}
        loading={clients === null && !clientsError}
        error={clientsError}
        query={query.trim()}
      />
    )
  }

  const overlays = (
    <>
      {form && (
        <ProductForm_org
          product={form.product}
          saving={busy}
          error={actionError}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}
      {toDelete && (
        <ConfirmDialog_org
          title={`¿Quitar «${toDelete.name}»?`}
          message="Dejará de verse en el menú y no se podrá comprar. Los pedidos anteriores no se ven afectados."
          confirmLabel="Eliminar"
          busy={busy}
          error={actionError}
          onConfirm={handleConfirmDelete}
          onCancel={() => !busy && setToDelete(null)}
        />
      )}
    </>
  )

  return (
    <AdminTemplate_temp
      profile={{ name: me.name }}
      onLogout={handleLogout}
      onAddProduct={() => openForm()}
      tab={tab}
      onTabChange={setTab}
      actions={actions}
      overlays={overlays}
    >
      {content}
    </AdminTemplate_temp>
  )
}
