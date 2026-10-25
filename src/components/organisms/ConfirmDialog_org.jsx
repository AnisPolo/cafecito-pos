import Modal_org from './Modal_org'
import styles from './ConfirmDialog_org.module.css'

/* Confirmación de una acción (p. ej. quitar un producto del menú) */
export default function ConfirmDialog_org({
  title,
  message,
  confirmLabel = 'Confirmar',
  busy = false,
  error = '',
  onConfirm,
  onCancel,
}) {
  return (
    <Modal_org title={title} onClose={onCancel}>
      <p className={styles.message}>{message}</p>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel} disabled={busy}>
          Cancelar
        </button>
        <button type="button" className={styles.confirm} onClick={onConfirm} disabled={busy}>
          {busy ? 'Quitando...' : confirmLabel}
        </button>
      </div>
    </Modal_org>
  )
}
