import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const lineKey = (i) => [i.productId, i.milk, i.size, i.flavor, i.whippedCream].join("|");

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(items)); } catch { /* sin storage */ }
  }, [items]);

  // misma bebida con las mismas opciones = misma línea, suma cantidad
  const addItem = (item) =>
    setItems((prev) => {
      const same = prev.find((i) => lineKey(i) === lineKey(item));
      if (same) {
        return prev.map((i) => (i === same ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });

  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));
  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
