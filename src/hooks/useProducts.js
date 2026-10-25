import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useProducts(){
    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    // vuelve a pedir la lista sin mostrar "Cargando..." (p. ej. tras crear o editar un producto)
    const reload = useCallback(() => getProducts().then(setProducts), []);

    return {products, loading, error, reload};
}
