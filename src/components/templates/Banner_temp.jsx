import Register_atm from '../atoms/Register_atm'
import styles from './Banner_temp.module.css'

/* Banner de descuento: panel naranja con borde curvo sobre la foto
   — ref_img/1x/Banner_temp.png */
export default function Banner_temp({ title, body, cta }) {
  return (
    <section className={styles.banner}>
      <img className={styles.photo} src="/img/banner_coffee.jpg" alt="" />
      <svg
        className={styles.shape}
        viewBox="0 0 1000 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,0 H519 C560,90 545,180 619,280 H0 Z" fill="var(--orange)" />
      </svg>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <Register_atm>{cta}</Register_atm>
      </div>
    </section>
  )
}
