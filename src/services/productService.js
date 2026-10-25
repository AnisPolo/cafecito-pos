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


// --- Solo admin: crear, editar y quitar (ocultar) productos ---

// Mensajes del servidor traducidos; los que no estén aquí se muestran tal cual
const MESSAGES = {
    "Name is required": "El nombre es obligatorio",
    "Category must be hot, cold or pastry": "Elige una categoría válida",
    "Price must be a number greater than or equal to 0": "El precio debe ser un número mayor o igual a 0",
    "Image must be one of the files in /img/products": "Elige una imagen de la lista",
    "Product not found": "El producto ya no existe",
    "Nothing to update": "No hay cambios que guardar",
    "Forbidden": "No tienes permiso para hacer esto",
};

async function send(method, url, token, body) {
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const error = new Error(MESSAGES[data.message] || data.message || "No se pudo completar la acción");
        error.status = res.status; // 401 = sesión vencida
        throw error;
    }
    return data;
}

export const createProduct = (data, token) => send("POST", "/api/product", token, data);
export const updateProduct = (id, data, token) => send("PUT", `/api/product/${id}`, token, data);
export const deleteProduct = (id, token) => send("DELETE", `/api/product/${id}`, token);
