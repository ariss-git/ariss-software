import { ProductService } from "../../services/stock/product.service.js";

const productServices = new ProductService();

export const addProductController = async (req, res) => {
  const {
    title,
    price,
    sku,
    type,
    label,
    warranty,
    quantity,
    usps,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId,
  } = req.body;

  const data = {
    title,
    price,
    type,
    label,
    warranty,
    quantity,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId,
  };

  if (!data) {
    return res.status(404).json({ message: "Missing fields are required" });
  }

  try {
    const product = await productServices.addProduct(
      title,
      price,
      sku,
      type,
      label,
      warranty,
      quantity,
      usps,
      keywords,
      description,
      images,
      categoryId,
      subcategoryId,
      panelUserId
    );

    res.status(201).json({ message: "Product added", data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllProductsController = async (_req, res) => {
  try {
    const product = await productServices.fetchAllProducts();
    res.status(200).json({ total: product.length, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchSingleProductController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const product = await productServices.fetchSingleProduct(id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in parmas" });
  }

  const {
    title,
    price,
    sku,
    visibility,
    type,
    label,
    warranty,
    quantity,
    usps,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId,
  } = req.body;

  const data = {
    title,
    price,
    visibility,
    type,
    label,
    warranty,
    quantity,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId,
  };

  if (!data) {
    return res.status(404).json({ message: "Missing fields are required" });
  }

  try {
    const product = await productServices.updateProduct(
      id,
      title,
      price,
      sku,
      visibility,
      type,
      label,
      warranty,
      quantity,
      usps,
      keywords,
      description,
      images,
      categoryId,
      subcategoryId,
      panelUserId
    );

    res.status(200).json({ message: "Product updated", data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "Panel User ID not found" });
  }

  try {
    const product = await productServices.deleteProduct(id, panelId);
    res.status(200).json({ message: "Product deleted", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
