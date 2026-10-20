import { useEffect } from 'react'
import styles from './OrderReceipt_org.module.css'

const LABELS = { full: 'Entera', deslactosada: 'Deslactosada' }

const money = (n) => {
  const rounded = Math.round(n * 100) / 100
  return `$${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`
}

// Filas de especificaciones; los productos sin leche (postres) no llevan
const specRows = (item) => {
  const rows = []
  if (item.milk) rows.push(['Leche', LABELS[item.milk] || item.milk])
  if (item.flavor) rows.push(['Sabor', item.flavor])
  if (item.milk) rows.push(['Crema batida', item.whippedCream ? 'Sí' : 'No'])
  return rows
}

/* Ticket del pedido en una ventana sobre el carrito — ref_img (ticket de confirmación).
   Se cierra con la X, con Escape o con un clic en el fondo. */
export default function OrderReceipt_org({ orderNumber, name, items, discountAmount, total, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar" autoFocus>
          ✕
        </button>

        <header className={styles.header}>
          <h2 id="receipt-title" className={styles.title}>
            Pedido #{orderNumber}
          </h2>
          <p className={styles.name}>{name}</p>
        </header>

        <div className={styles.items}>
          {items.map((item, index) => {
            const rows = specRows(item)
            const hasDiscount = item.discount > 0
            const discountLabel = <span className={styles.itemDiscount}>-{money(item.discount)}</span>
            return (
              <article className={styles.item} key={`${item.productId}-${index}`}>
                <header className={styles.head}>
                  <h3 className={styles.itemName}>
                    {item.name}
                    {item.quantity > 1 ? ` x${item.quantity}` : ''}
                  </h3>
                  <span className={styles.itemPrice}>{money(item.price * item.quantity)}</span>
                </header>
                {(rows.length > 0 || hasDiscount) && (
                  <dl className={styles.specs}>
                    {rows.map(([label, value], i) => (
                      <div className={styles.spec} key={label}>
                        <dt>{label}:</dt>
                        <dd>{value}</dd>
                        {i === rows.length - 1 && hasDiscount && discountLabel}
                      </div>
                    ))}
                    {rows.length === 0 && hasDiscount && (
                      <div className={styles.spec}>{discountLabel}</div>
                    )}
                  </dl>
                )}
              </article>
            )
          })}
        </div>

        <footer className={styles.totals}>
          {discountAmount > 0 && (
            <p className={`${styles.line} ${styles.discount}`}>
              <span>Descuento</span>
              <span>-{money(discountAmount)}</span>
            </p>
          )}
          <p className={`${styles.line} ${styles.total}`}>
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
        </footer>
      </section>
    </div>
  )
}
