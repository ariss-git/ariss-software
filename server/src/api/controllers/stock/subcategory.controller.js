import { SubCategoryService } from "../../services/stock/subcategory.service.js";

const subcategoryService = new SubCategoryService();

export const addSubcategoryController = async (req, res) => {
  const { title, description, image, categoryId, panelUserId } = req.body;
  const data = { title, description, image, categoryId, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const subcategory = await subcategoryService.addSubcategory(
      title,
      description,
      image,
      categoryId,
      panelUserId
    );
    res.status(201).json({ message: "Subcategory added", data: subcategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSubcategoryController = async (_req, res) => {
  try {
    const subcategory = await subcategoryService.getAllSubcategory();
    res.status(200).json({ total: subcategory.length, data: subcategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleSubcategoryController = async (req, res) => {
  const { id } = req.params;

  try {
    const subcategory = await subcategoryService.getSingleSubcategory(id);
    res.status(200).json({ total: subcategory.length, data: subcategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSubcategoryController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found" });
  }

  const { title, description, image, categoryId, panelUserId } = req.body;
  const data = { title, description, image, categoryId, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const subcategory = await subcategoryService.updateSubcategory(
      id,
      title,
      description,
      image,
      categoryId,
      panelUserId
    );
    res.status(200).json({ message: "Subcategory updated", data: subcategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSubcategoryController = async (req, res) => {
  const { id } = req.params;
  const { panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "IDs not found" });
  }

  try {
    const subcategory = await subcategoryService.deleteSubcategory(id);
    res.status(200).json({ message: "Subcategory deleted", data: subcategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
