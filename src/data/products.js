const img = (file) => `/img/products/${file}`

const americano = img(`americano.png`);
const espresso = img(`espresso.png`);
const capuchino = img(`capuchino.png`);
const latte = img(`latte.png`);
const icedLatte = img(`iced_latte.png`);
const frappe = img(`frappe.png`);
const tisana = img(`tisana.png`);
const smoothie = img(`smoothie.png`);
const bananaPie = img(`banana_pie.png`);
const cheescake = img(`cheescake.png`);
const productImg = img(`frappe.png`);

/* Datos estáticos: la maqueta no tiene lógica, solo alimenta a los componentes */

export const hotDrinks = [
  { id: 'americano', name: 'Americano', price: 100, image: americano },
  { id: 'espresso', name: 'Espresso', price: 100, image: espresso },
  { id: 'capuchino', name: 'Capuchino', price: 100, image: capuchino },
  { id: 'latte', name: 'Latte', price: 100, image: latte },
]

export const coldDrinks = [
  { id: 'iced-latte', name: 'Iced Latte', price: 100, image: icedLatte },
  { id: 'frappe', name: 'Frappe', price: 100, image: frappe },
  { id: 'tisana', name: 'Tisana', price: 100, image: tisana },
  { id: 'smoothie', name: 'Smoothie', price: 100, image: smoothie },
]

export const desserts = [
  { id: 'pancito', name: 'Pancito de platano', price: 100, image: bananaPie },
  { id: 'chescake', name: 'Chescake de zarzamora', price: 100, image: cheescake },
]

export const featuredProducts = [
  { id: 'frappe', name: 'Frappe', price: 100, image: frappe },
  { id: 'iced-latte', name: 'Iced Latte', price: 100, image: icedLatte },
  { id: 'capuchino', name: 'Capuchino', price: 100, image: capuchino },
  { id: 'espresso', name: 'Espresso', price: 100, image: espresso },
  { id: 'americano', name: 'Americano', price: 100, image: americano },
]

export const productDetail = {
  name: 'Frappe',
  image: productImg,
  milkOptions: [
    { id: 'entera', label: 'Entera', selected: true },
    { id: 'deslactosada', label: 'Deslactosada', selected: false },
  ],
  flavorOptions: [
    { id: 'original', label: 'Original', selected: true },
    { id: 'menta', label: 'Menta', selected: false },
    { id: 'moka', label: 'Moka', selected: false },
    { id: 'matcha', label: 'Matcha', selected: false },
    { id: 'taro', label: 'Taro', selected: false },
  ],
  whippedCream: false,
}

export const cartItems = [
  {
    id: 'cart-1',
    name: 'Frappe',
    price: 70,
    image: productImg,
    milk: 'Entera',
    flavor: 'Original',
    cream: 'Si',
  },
  {
    id: 'cart-2',
    name: 'Frappe',
    price: 70,
    image: productImg,
    milk: 'Entera',
    flavor: 'Original',
    cream: 'Si',
  },
]

export const profile = {
  name: 'Nombre',
  discount: '5%',
  nextDiscountHint: 'Sube a 10% registrando 1 compras mas!',
  seals: { total: 15, filled: 3 },
}

export const lastOrders = [
  { id: 'order-1', date: '18/09/2026', amount: 120 },
  { id: 'order-2', date: '18/09/2026', amount: 120 },
]

export const contactLinks = [
  { id: 'phone', label: '4491263845' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
]

export const discountBanner = {
  title: 'Descuento del 5%',
  body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis',
  cta: 'Registrate',
}
