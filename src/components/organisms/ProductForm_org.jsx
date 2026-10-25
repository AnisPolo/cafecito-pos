import { useState } from 'react'
import Modal_org from './Modal_org'
import { PRODUCT_IMAGES, imageFile, imagePath } from '../../data/productImages'
import styles from './ProductForm_org.module.css'

const CATEGORIES = [
  { value: 'hot', label: 'Bebida caliente' },
  { value: 'cold', label: 'Bebida fría' },
  { value: 'pastry', label: 'Postre' },
]
// leche y tamaños de las bebidas (iguales a los del seed); los postres no los llevan
const DEFAULT_MILK = ['full', 'deslactosada']
const DEFAULT_SIZE = ['small', 'medium', 'large']

const parseFlavors = (text) =>
  text.split(',').map((f) => f.trim()).filter(Boolean)

/* Formulario para crear o editar un producto (solo admin).
   product = null → crear; product = {...} → editar. */
export default function ProductForm_org({ product, saving = false, error = '', onSubmit, onCancel }) {
  const editing = Boolean(product)
  const [name, setName] = useState(product?.name ?? '')
  const [category, setCategory] = useState(product?.category ?? 'hot')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [image, setImage] = useState(product ? imageFile(product.image) : PRODUCT_IMAGES[0].file)
  const [whippedCream, setWhippedCream] = useState(product?.whippedCream ?? false)
  const [flavors, setFlavors] = useState((product?.flavor ?? []).join(', '))
  const [localError, setLocalError] = useState('')

  const drink = category !== 'pastry'

  // si la foto actual no está en la lista (producto antiguo), se conserva como opción
  const options = PRODUCT_IMAGES.some((i) => i.file === image)
    ? PRODUCT_IMAGES
    : [{ file: image, label: `${image} (actual)` }, ...PRODUCT_IMAGES]

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = Number(price)
    if (price.trim() === '' || !Number.isFinite(value) || value < 0) {
      setLocalError('El precio debe ser un número mayor o igual a 0')
      return
    }
    setLocalError('')

    const data = {
      name: name.trim(),
      category,
      price: value,
      image: imagePath(image),
      whippedCream: drink ? whippedCream : false,
      flavor: drink ? parseFlavors(flavors) : [],
    }
    // al pasar de postre a bebida (o al revés) se ajustan leche y tamaños
    if (!drink) {
      data.milk = []
      data.size = []
    } else if (!product || (product.milk ?? []).length === 0) {
      data.milk = DEFAULT_MILK
      data.size = DEFAULT_SIZE
    }
    onSubmit(data)
  }

  const shownError = localError || error

  return (
    <Modal_org title={editing ? `Editar ${product.name}` : 'Agregar producto'} onClose={onCancel}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
        </label>

        <label className={styles.field}>
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          Precio ($)
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <div className={styles.imageRow}>
          <label className={styles.field}>
            Imagen
            <select value={image} onChange={(e) => setImage(e.target.value)}>
              {options.map((i) => (
                <option key={i.file} value={i.file}>
                  {i.label}
                </option>
              ))}
            </select>
          </label>
          <img className={styles.preview} src={imagePath(image)} alt={`Vista previa: ${image}`} />
        </div>

        {drink && (
          <>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={whippedCream}
                onChange={(e) => setWhippedCream(e.target.checked)}
              />
              Permite crema batida
            </label>
            <label className={styles.field}>
              Sabores (separados por comas)
              <input
                value={flavors}
                onChange={(e) => setFlavors(e.target.value)}
                placeholder="original, matcha, taro"
              />
            </label>
          </>
        )}

        {shownError && (
          <p className={styles.error} role="alert">
            {shownError}
          </p>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel} disabled={saving}>
            Cancelar
          </button>
          <button type="submit" className={styles.save} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal_org>
  )
}
