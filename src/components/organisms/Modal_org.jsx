import { useEffect, useId } from 'react'
import styles from './Modal_org.module.css'

/* Ventana centrada sobre un fondo atenuado (misma forma que el ticket del pedido).
   Se cierra con la X, con Escape o con un clic en el fondo. */
export default function Modal_org({ title, onClose, children }) {
  const titleId = useId()

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
      <section className={styles.card} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {children}
      </section>
    </div>
  )
}
