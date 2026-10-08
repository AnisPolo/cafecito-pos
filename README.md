# Coffee House — maqueta web

Maqueta en React de la web de Coffee House, construida con **Atomic Design** a partir del diseño
de `ref_img/` y los recursos de `assets/`. Es solo maquetación: los componentes son presentacionales
y se alimentan de datos estáticos, sin lógica de negocio ni estado.

## Cómo levantarla

```bash
npm install
npm run dev
```

Vite sirve la maqueta en `http://localhost:5173`. Otros comandos:

```bash
npm run build     # compila a dist/
npm run preview   # sirve el build ya compilado
```

La API (Express + MongoDB, con autenticación JWT) vive en `server/`; su guía está en
[server/README.md](server/README.md).

## Pantallas

| Ruta | Página | Referencia |
|---|---|---|
| `/` | `MainPage` | `ref_img/MainPage.png` |
| `/menu` | `MenuPage` | `ref_img/MenuPage.png` |
| `/producto` | `ProductPage` | `ref_img/ProductPage.png` |
| `/carrito` | `CartPage` | `ref_img/CartPage.png` |
| `/perfil` | `ProfilePage` | `ref_img/ProfilePage.png` |

El header enlaza las cinco rutas, así que se puede recorrer la maqueta entera desde el navegador.

## Estructura

```
src/
  main.jsx  App.jsx        router de las 5 rutas
  styles/tokens.css        paleta, tipografías y escalas
  styles/global.css        reset y estilos base
  assets/img|svg/          imágenes y vectores
  data/products.js         datos mock de toda la maqueta
  components/
    atoms/                 piezas indivisibles      (*_atm)
    molecules/             grupos de átomos         (*_mol)
    organisms/             bloques con sentido      (*_org)
    templates/             layout de cada pantalla  (*_temp)
  pages/                   pantallas finales        (*Page)
```

Cada componente son dos archivos: `Nombre_sufijo.jsx` y su `Nombre_sufijo.module.css` (CSS Modules,
estilos aislados). Los colores y tipografías nunca se escriben a mano: salen de las variables de
`styles/tokens.css`.

## Convención de nombres

El sufijo dice en qué capa vive el componente y se mantiene igual al de los archivos de diseño:

- `_atm` — átomo: `SearchBar_atm`, `Seal_atm`, `PaymentBtn_atm`
- `_mol` — molécula: `Product_mol`, `Total_mol`
- `_org` — organismo: `MenuCategory_org`, `Footer_org`
- `_temp` — template: `Header_temp`, `Banner_temp`, `MenuTemplate_temp`
- `Page` — página: `MainPage`, `CartPage`

`Header_temp`, `Banner_temp` y `MainProducts_temp` conservan el sufijo `_temp` que traían los
archivos de `ref_img/1x/`, para que la correspondencia con el diseño sea uno a uno.

## Estados visuales

Como no hay lógica, los estados se pasan por props y se pueden ver duplicando el componente:

```jsx
<OptionBtn_atm selected>Entera</OptionBtn_atm>   <OptionBtn_atm>Deslactosada</OptionBtn_atm>
<Seal_atm filled />                              <Seal_atm />
<Header_temp active="menu" />                    <Header_temp active="perfil" />
```

El detalle del sistema de diseño y el inventario completo de componentes está en
[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
