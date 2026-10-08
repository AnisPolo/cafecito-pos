export const milkOptions = ["full", "deslactosada"];
export const sizeOptions =["small", "medium", "large"]


export const menu = [
 { name: "Latte", category: "hot", price: 70, milk: milkOptions, size:sizeOptions, whippedCream: false, image: "/img/products/latte.png" },
 { name: "Capuchino", category: "hot", price: 90, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/capuchino.png" },
 { name: "Espresso", category: "hot", price: 60, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/espresso.png" },
 { name: "Americano", category: "hot", price: 75, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/americano.png" },
 { name: "Frappe", category: "cold", price: 70, milk: milkOptions, size: sizeOptions, whippedCream: true, image: "/img/products/frappe.png",flavor: ["original","matcha", "mint", "moka","taro"] },
 { name: "Smoothie", category: "cold", price: 60, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/smoothie.png",flavor:["fresa","platano","mango"] },
 { name: "Tisana", category: "cold", price: 65, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/tisana.png",flavor:["manzanilla","frutos rojos"] },
 { name: "Iced Latte", category: "cold", price: 85, milk: milkOptions, size: sizeOptions, whippedCream: false, image: "/img/products/iced_latte.png" },
 { name: "Cheesecake de zarzamora", category: "pastry", price: 30, image: "/img/products/cheescake.png"},
 { name: "Pancito de plátano", category: "pastry", price: 30, image: "/img/products/banana_pie.png"}
]
