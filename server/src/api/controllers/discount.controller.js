import { DiscountService } from "../services/discount.service.js";

const discountServices = new DiscountService();

export const assignDiscountController = async (req, res) => {
  const { type, expiryDate, dealerId, productId, panelUserId } = req.body;
  const data = { type, expiryDate, dealerId, productId, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "Required fields are missing" });
  }

  try {
    const discount = await discountServices.assignDiscount(
      type,
      expiryDate,
      dealerId,
      productId,
      panelUserId
    );
    res.status(201).json({ message: "Discount assigned", data: discount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
