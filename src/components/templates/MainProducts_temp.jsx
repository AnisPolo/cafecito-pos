import MainProducts_org from '../organisms/MainProducts_org'
import ShowMore_atm from '../atoms/ShowMore_atm'
import styles from './MainProducts_temp.module.css'

/* Banda de destacados + barra "Ver más" — ref_img/1x/MainProducts_temp.png */
export default function MainProducts_temp({ products }) {
  return (
    <div className={styles.block}>
      <MainProducts_org products={products} />
      <div className={styles.more}>
        <ShowMore_atm />
      </div>
    </div>
  )
}
