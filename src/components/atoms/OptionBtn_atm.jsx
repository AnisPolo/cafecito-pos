import styles from './OptionBtn_atm.module.css'

/* Píldora de opción — seleccionada: ref_img/1x/optionBtn_atm.png (sage con borde)
   sin seleccionar: ref_img/1x/Asset 13.png (olive sin borde). */
export default function OptionBtn_atm({ children, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${selected ? styles.selected : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
