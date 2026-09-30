import ContactList_mol from '../molecules/ContactList_mol'
import map from '../../assets/img/map.jpg'
import styles from './Footer_org.module.css'

/* Pie con contactos y mapa — ref_img/MainPage.png */
export default function Footer_org({ links }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.contacts}>
        <ContactList_mol links={links} />
      </div>
      <div className={styles.map}>
        <img src={map} alt="Ubicación de la cafetería" />
      </div>
    </footer>
  )
}
