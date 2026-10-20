import crypto from "crypto";

// Sin O, 0, I, 1 para que el código no se confunda al dictarlo en mostrador
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// Número de referencia de pedido, p. ej. "CF-7K3F9Q"
export const generateOrderNumber = () =>
  "CF-" + Array.from(crypto.randomBytes(6), (b) => ALPHABET[b % ALPHABET.length]).join("");
