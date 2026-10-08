import MenuTemplate_temp from '../components/templates/MenuTemplate_temp'
import { useProducts } from '../hooks/useProducts';

function MenuPage() {

const {products, loading, error} = useProducts();

if(loading) return <p>Cargando...</p>;
if(error) return <p>Error al cargar el menú</p>;

const withId = (p) => ({...p, id: p._id});

const hotDrinks = products.filter(p => p.category === "hot").map(withId);
const coldDrinks = products.filter(p => p.category === "cold").map(withId);
const desserts = products.filter(p => p.category === "pastry").map(withId);

/* ref_img/MenuPage.png */
return <MenuTemplate_temp hotDrinks={hotDrinks} coldDrinks={coldDrinks} desserts={desserts} />
}

export default MenuPage;
