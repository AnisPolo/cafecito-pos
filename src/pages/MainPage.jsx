import MainTemplate_temp from '../components/templates/MainTemplate_temp'
import { featuredProducts, discountBanner, contactLinks } from '../data/products'

/* ref_img/MainPage.png */
export default function MainPage() {
  return (
    <MainTemplate_temp
      products={featuredProducts}
      banner={discountBanner}
      contactLinks={contactLinks}
    />
  )
}
