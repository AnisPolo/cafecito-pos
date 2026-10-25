import Product from "../models/Product.js";

// Solo se ven y se compran los productos activos ("Eliminar" los oculta; los documentos antiguos no tienen el campo)
const ACTIVE = { active: { $ne: false } };

const CATEGORIES = ["hot", "cold", "pastry"];
// Las fotos viven en public/img/products; no se aceptan URLs externas
const IMAGE_REGEX = /^\/img\/products\/[\w.-]+\.(png|jpe?g|webp|svg)$/i;
const DEFAULT_MILK = ["full", "deslactosada"];
const DEFAULT_SIZE = ["small", "medium", "large"];

const isStringList = (v) => Array.isArray(v) && v.every((x) => typeof x === "string" && x.trim());
const cleanList = (v) => v.map((x) => x.trim());

// Valida y limpia los campos de un producto. `partial` = edición (solo los campos recibidos).
// Devuelve { data } o { error } con el mensaje para el cliente.
const parseProduct = (body = {}, { partial = false } = {}) => {
  const data = {};
  const has = (key) => body[key] !== undefined;

  if (!partial || has("name")) {
    if (typeof body.name !== "string" || !body.name.trim()) return { error: "Name is required" };
    data.name = body.name.trim();
  }
  if (!partial || has("category")) {
    if (!CATEGORIES.includes(body.category)) return { error: "Category must be hot, cold or pastry" };
    data.category = body.category;
  }
  if (!partial || has("price")) {
    if (typeof body.price !== "number" || !Number.isFinite(body.price) || body.price < 0) {
      return { error: "Price must be a number greater than or equal to 0" };
    }
    data.price = body.price;
  }
  if (!partial || has("image")) {
    if (typeof body.image !== "string" || !IMAGE_REGEX.test(body.image)) {
      return { error: "Image must be one of the files in /img/products" };
    }
    data.image = body.image;
  }
  for (const key of ["milk", "size", "flavor"]) {
    if (has(key)) {
      if (!isStringList(body[key])) return { error: `${key} must be a list of texts` };
      data[key] = cleanList(body[key]);
    }
  }
  if (has("whippedCream")) {
    if (typeof body.whippedCream !== "boolean") return { error: "whippedCream must be true or false" };
    data.whippedCream = body.whippedCream;
  }

  if (!partial) {
    // bebidas: leche y tamaños por defecto; los postres no los llevan
    const drink = data.category !== "pastry";
    data.milk ??= drink ? DEFAULT_MILK : [];
    data.size ??= drink ? DEFAULT_SIZE : [];
    data.flavor ??= [];
    data.whippedCream = drink ? (data.whippedCream ?? false) : false;
  }
  return { data };
};

// Un id con formato inválido se trata como "no encontrado"
const notFound = (error) => error.name === "CastError";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(ACTIVE);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "failed to get products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { data, error } = parseProduct(req.body);
    if (error) return res.status(400).json({ message: error });

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).json({ message: "failed to create product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, ...ACTIVE });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    if (notFound(error)) return res.status(404).json({ message: "Product not found" });
    res.status(500).json({ message: "failed to get product by id" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { data, error } = parseProduct(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const product = await Product.findOneAndUpdate({ _id: req.params.id, ...ACTIVE }, data, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    if (notFound(error)) return res.status(404).json({ message: "Product not found" });
    console.log("Error updating product:", error);
    res.status(500).json({ message: "failed to update product" });
  }
};

// "Eliminar" = ocultar: el producto deja de verse y de poder comprarse, pero se conserva en la BD
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, ...ACTIVE },
      { active: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    if (notFound(error)) return res.status(404).json({ message: "Product not found" });
    res.status(500).json({ message: "failed to delete product" });
  }
};
