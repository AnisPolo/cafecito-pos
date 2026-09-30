import arrow from '../../assets/svg/arrow_right.svg'
import styles from './ShowMore_atm.module.css'

/* "Ver más" de la banda verde — ref_img/1x/show more_atn.png */
export default function ShowMore_atm({ children = 'Ver más' }) {
  return (
    <button type="button" className={styles.btn}>
      <span>{children}</span>
      <img className={styles.arrow} src={arrow} alt="" />
    </button>
  )
}
