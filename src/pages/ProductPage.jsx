import ProductTemplate_temp from '../components/templates/ProductTemplate_temp'
import { productDetail } from '../data/products'

/* ref_img/ProductPage.png */
export default function ProductPage() {
  return <ProductTemplate_temp product={productDetail} />
}
