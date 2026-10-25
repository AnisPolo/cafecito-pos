// Fotos disponibles para los productos (carpeta public/img/products).
// Si agregas una foto nueva a esa carpeta, añade aquí una línea para poder elegirla.
export const PRODUCT_IMAGES = [
  { file: 'americano.png', label: 'Americano' },
  { file: 'banana_pie.png', label: 'Pancito de plátano' },
  { file: 'capuchino.png', label: 'Capuchino' },
  { file: 'cheescake.png', label: 'Cheesecake' },
  { file: 'espresso.png', label: 'Espresso' },
  { file: 'frappe.png', label: 'Frappe' },
  { file: 'iced_latte.png', label: 'Iced Latte' },
  { file: 'latte.png', label: 'Latte' },
  { file: 'smoothie.png', label: 'Smoothie' },
  { file: 'tisana.png', label: 'Tisana' },
]

export const IMAGE_BASE = '/img/products/'
export const imagePath = (file) => `${IMAGE_BASE}${file}`
export const imageFile = (path = '') => path.replace(IMAGE_BASE, '')
