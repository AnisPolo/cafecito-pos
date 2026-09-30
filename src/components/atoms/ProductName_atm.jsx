import styles from './ProductName_atm.module.css'

/* Nombre de producto en Leckerli One — ref_img/1x/Product_mol.png */
export default function ProductName_atm({ children, tone = 'copper', size = 'md' }) {
  return <span className={`${styles.name} ${styles[tone]} ${styles[size]}`}>{children}</span>
}
