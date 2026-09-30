import MenuTemplate_temp from '../components/templates/MenuTemplate_temp'
import { hotDrinks, coldDrinks, desserts } from '../data/products'

/* ref_img/MenuPage.png */
export default function MenuPage() {
  return <MenuTemplate_temp hotDrinks={hotDrinks} coldDrinks={coldDrinks} desserts={desserts} />
}
