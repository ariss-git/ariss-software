import { ReturnService } from "../services/return.service.js";

const returnServices = new ReturnService();

export const createReturnRequestController = async (req, res) => {
  const { productName, modelNo, issue, images, customerId } = req.body;
  const data = { modelNo, issue, images, customerId };

  if (!data) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const rma = await returnServices.createReturnRequest(
      productName,
      modelNo,
      issue,
      images,
      customerId
    );
    res.status(201).json({ message: "RMA Request created", data: rma });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllReturnsController = async (_req, res) => {
  try {
    const rma = await returnServices.fetchAllReturns();
    res.status(200).json({ data: rma });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReturnController = async (_req, res) => {
  try {
    const rma = await returnServices.getAllReturn();
    res.status(200).json({ data: rma });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReturnRequestController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const rma = await returnServices.approveReturnRequest(id);
    res.status(200).json({ message: "RMA approved", data: rma });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectReturnRequestController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const rma = await returnServices.rejectReturnRequest(id);
    res.status(200).json({ message: "RMA rejected", data: rma });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReturnRequestController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const rma = await returnServices.deleteReturnRequest(id);
    res.status(200).json({ message: "RMA deleted", data: rma });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
