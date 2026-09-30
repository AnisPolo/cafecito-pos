import styles from './Contact_atm.module.css'

/* Contacto del footer — ref_img/1x/contact_atm.png */
export default function Contact_atm({ children }) {
  return (
    <span className={styles.contact}>
      <span className={styles.dot} />
      <span className={styles.label}>{children}</span>
    </span>
  )
}
