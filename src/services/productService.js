export async function getProducts() {
    const res = await fetch("/api/product");
    if(!res.ok) throw new Error("no se pudieron cargar los productos");
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`/api/product/${id}`);
    if(!res.ok) throw new Error("producto no encontrado");
    return res.json();
}

