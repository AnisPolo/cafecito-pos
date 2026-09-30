import Contact_atm from '../atoms/Contact_atm'
import styles from './ContactList_mol.module.css'

/* Lista de contactos del footer — ref_img/MainPage.png */
export default function ContactList_mol({ links }) {
  return (
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.id}>
          <Contact_atm>{link.label}</Contact_atm>
        </li>
      ))}
    </ul>
  )
}
