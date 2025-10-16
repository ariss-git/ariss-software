import { DiscountService } from "../services/discount.service.js";

const discountServices = new DiscountService();

export const assignDiscountController = async (req, res) => {
  const { type, expiryDate, amount, dealerId, productId, panelUserId } = req.body;
  const data = { type, expiryDate, amount, dealerId, productId, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "Required fields are missing" });
  }

  try {
    const discount = await discountServices.assignDiscount(
      type,
      expiryDate,
      amount,
      dealerId,
      productId,
      panelUserId
    );
    res.status(201).json({ message: "Discount assigned", data: discount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllDiscountsController = async (_req, res) => {
  try {
    const discount = await discountServices.fetchAllDiscounts();
    res.status(200).json({ total: discount.length, data: discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchSingleDiscountController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const discount = await discountServices.fetchAllDiscounts();
    res.status(200).json({ total: discount.length, data: discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDiscountController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id) {
    return res
      .status(404)
      .json({ message: "ID and Panel ID not found in params" });
  }

  try {
    const discount = await discountServices.deleteDiscount(id, panelId);
    res.status(200).json({ message: "Discount deleted", data: discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


