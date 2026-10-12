import Cart from "../models/Cart.js";

// De mayor a menor: gana el primer tramo que cumpla n >= min
export const DISCOUNT_TIERS = [
  { min: 8, discount: 15 },
  { min: 4, discount: 10 },
  { min: 1, discount: 5 },
  { min: 0, discount: 0 },
];

export const getDiscount = (purchasesCount) =>
  DISCOUNT_TIERS.find((t) => purchasesCount >= t.min).discount;

// Siguiente tramo a alcanzar, o null si ya está en el máximo
export const getNextTier = (purchasesCount) =>
  [...DISCOUNT_TIERS].reverse().find((t) => t.min > purchasesCount) ?? null;

// Calcula las compras previas y el descuento que aplica a la compra actual
export const discountVerify = async (req, res, next) => {
  try {
    req.purchasesCount = await Cart.countDocuments({ user: req.user._id });
    req.discount = getDiscount(req.purchasesCount);
    next();
  } catch (error) {
    res.status(500).json({ message: "failed to verify discount" });
  }
};
