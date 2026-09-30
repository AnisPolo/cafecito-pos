import styles from './SectionTitle_atm.module.css'

/* Título de sección: "Bebidas calientes", "Barra fria", "Postres" — ref_img/MenuPage.png */
export default function SectionTitle_atm({ children, tone = 'brown' }) {
  return <h2 className={`${styles.title} ${styles[tone]}`}>{children}</h2>
}
