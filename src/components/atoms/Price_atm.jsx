import styles from './Price_atm.module.css'

/* Precio en Montserrat black — ref_img/1x/Product_mol.png */
export default function Price_atm({ value, size = 'lg' }) {
  return <span className={`${styles.price} ${styles[size]}`}>${value}</span>
}
