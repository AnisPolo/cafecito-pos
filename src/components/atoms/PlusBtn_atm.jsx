import plus from '../../assets/svg/plus_icon.svg'
import styles from './PlusBtn_atm.module.css'

/* Botón "+" de las tarjetas de producto — assets/SVG/plus_icon.svg */
export default function PlusBtn_atm({ label = 'Agregar al pedido' }) {
  return (
    <button type="button" className={styles.btn} aria-label={label}>
      <img src={plus} alt="" />
    </button>
  )
}
