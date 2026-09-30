import Seal_atm from '../atoms/Seal_atm'
import styles from './SealsBoard_org.module.css'

/* Tarjetón de sellos 5x3 — ref_img/ProfilePage.png */
export default function SealsBoard_org({ total = 15, filled = 0 }) {
  const seals = Array.from({ length: total }, (_, index) => index < filled)

  return (
    <section className={styles.board}>
      {seals.map((isFilled, index) => (
        <Seal_atm key={index} filled={isFilled} />
      ))}
    </section>
  )
}
