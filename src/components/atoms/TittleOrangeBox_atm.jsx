import styles from './TittleOrangeBox_atm.module.css'

/* Título en Leckerli One. Con `boxed` toma la caja naranja del ref
   (ref_img/1x/tittleOrangeBox_atm.png); sin ella queda como texto marrón. */
export default function TittleOrangeBox_atm({ children, boxed = false, as: Tag = 'span' }) {
  return <Tag className={`${styles.title} ${boxed ? styles.boxed : styles.plain}`}>{children}</Tag>
}
