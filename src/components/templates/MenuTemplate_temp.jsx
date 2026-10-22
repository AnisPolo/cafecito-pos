import { Link } from 'react-router-dom'
import Header_temp from './Header_temp'
import MenuCategory_org from '../organisms/MenuCategory_org'
import Desserts_org from '../organisms/Desserts_org'
import styles from './MenuTemplate_temp.module.css'

/* Layout del menú: dos paneles de bebidas + postres — ref_img/MenuPage.png
   Con búsqueda activa (`query`) se ocultan las secciones vacías (los paneles conservan su color)
   y, si no hay resultados, se muestra un mensaje. */
export default function MenuTemplate_temp({ hotDrinks, coldDrinks, desserts, query = '' }) {
  const noResults = hotDrinks.length + coldDrinks.length + desserts.length === 0
  const showHot = hotDrinks.length > 0
  const showCold = coldDrinks.length > 0

  return (
    <div className={styles.page}>
      <Header_temp active="menu" />
      <main>
        {noResults ? (
          <section className={styles.empty} aria-live="polite">
            <p className={styles.emptyText}>No encontramos productos para «{query}»</p>
            <Link className={styles.clear} to="/menu">
              Quitar búsqueda
            </Link>
          </section>
        ) : (
          <>
            {(showHot || showCold) && (
              <div className={styles.categories}>
                {/* Los dos huecos se conservan: cada panel mantiene su ancho (media pantalla),
                    su lugar (calientes a la izquierda, frías a la derecha) y el tamaño de sus productos */}
                {showHot ? (
                  <MenuCategory_org
                    title="Bebidas calientes"
                    products={hotDrinks}
                    tone="hot"
                  />
                ) : (
                  <div className={styles.spacer} aria-hidden="true" />
                )}
                {showCold ? (
                  <MenuCategory_org
                    title="Barra fria"
                    products={coldDrinks}
                    tone="cold"
                  />
                ) : (
                  <div className={styles.spacer} aria-hidden="true" />
                )}
              </div>
            )}
            {desserts.length > 0 && <Desserts_org products={desserts} />}
          </>
        )}
      </main>
    </div>
  )
}
