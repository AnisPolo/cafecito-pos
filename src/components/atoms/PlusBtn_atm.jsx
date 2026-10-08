import plus from '../../assets/svg/plus_icon.svg'
import styles from './PlusBtn_atm.module.css'

/* Botón "+" de las tarjetas de producto — assets/SVG/plus_icon.svg */
export default function PlusBtn_atm({ label = 'Agregar al pedido', onClick }) {
  return (
    <button type="button" className={styles.btn} aria-label={label} onClick={onClick}>
      <img src={plus} alt="" />
    </button>
  )
}
