import styles from './SelectOption_atm.module.css'

/* Radio de sabor — ref_img/1x/selectOption_atm.png */
export default function SelectOption_atm({ children, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={styles.option}
      role="radio"
      aria-checked={selected}
      onClick={onClick}
    >
      <span className={`${styles.dot} ${selected ? styles.selected : ''}`} />
      <span className={styles.label}>{children}</span>
    </button>
  )
}
