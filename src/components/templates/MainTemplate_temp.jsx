import Header_temp from './Header_temp'
import MainProducts_temp from './MainProducts_temp'
import Banner_temp from './Banner_temp'
import Footer_org from '../organisms/Footer_org'
import styles from './MainTemplate_temp.module.css'

/* Layout de la portada — ref_img/MainPage.png */
export default function MainTemplate_temp({ products, banner, contactLinks }) {
  return (
    <div className={styles.page}>
      <Header_temp />
      <main className={styles.main}>
        <MainProducts_temp products={products} />
        <Banner_temp title={banner.title} body={banner.body} cta={banner.cta} />
      </main>
      <Footer_org links={contactLinks} />
    </div>
  )
}
