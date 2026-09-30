import Header_temp from './Header_temp'
import MenuCategory_org from '../organisms/MenuCategory_org'
import Desserts_org from '../organisms/Desserts_org'
import styles from './MenuTemplate_temp.module.css'

/* Layout del menú: dos paneles de bebidas + postres — ref_img/MenuPage.png */
export default function MenuTemplate_temp({ hotDrinks, coldDrinks, desserts }) {
  return (
    <div className={styles.page}>
      <Header_temp active="menu" searchValue="Taro" />
      <main>
        <div className={styles.categories}>
          <MenuCategory_org title="Bebidas calientes" products={hotDrinks} tone="hot" />
          <MenuCategory_org title="Barra fria" products={coldDrinks} tone="cold" />
        </div>
        <Desserts_org products={desserts} />
      </main>
    </div>
  )
}
