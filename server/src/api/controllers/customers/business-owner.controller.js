import { BusinessOwnerService } from "../../services/customers/business-owner.service.js";

const businessOwnerServices = new BusinessOwnerService();

export const registerOwnerController = async (req, res) => {
  const {
    email,
    phone,
    name,
    gstin,
    business,
    shippingAddress,
    billingAddress,
  } = req.body;

  if (
    !email ||
    !phone ||
    !name ||
    !gstin ||
    !business ||
    !shippingAddress ||
    !billingAddress
  ) {
    res.status(500);
    throw new Error("All fields are required");
  }

  try {
    const owner = await businessOwnerServices.registerOwner(
      email,
      phone,
      name,
      gstin,
      business,
      shippingAddress,
      billingAddress
    );

    res
      .status(201)
      .json({ message: "Business account has been registered", data: owner });
  } catch (error) {
    res.status(400);
    throw new Error("There was an error adding user", error.message);
  }
};

export const fetchAllApprovedController = async (_req, res) => {
  try {
    const owner = await businessOwnerServices.fetchAllApproved();
    res.status(200).json({ total: owner.length, data: owner });
  } catch (error) {
    res.status(500);
    throw new Error("There was an error fetching users", error.message);
  }
};

export const fetchAllNonApprovedController = async (_req, res) => {
  try {
    const owner = await businessOwnerServices.fetchAllNonApproved();
    res.status(200).json({ total: owner.length, data: owner });
  } catch (error) {
    res.status(500);
    throw new Error("There was an error fetching users", error.message);
  }
};

export const updateOwnerAddressController = async (req, res) => {
  const { email } = req.params;
  const { billingAddress, shippingAddress } = req.body;

  if (!email) {
    res.status(404);
    throw new Error("Email not found in params");
  }

  if (!billingAddress || !shippingAddress) {
    res.status(500);
    throw new Error("Billing and Shipping address are missing keys or values");
  }

  try {
    const owner = await businessOwnerServices.updateOwnerAddress(
      shippingAddress,
      billingAddress,
      email
    );

    res.status(200).json({ message: "Business address updated", data: owner });
  } catch (error) {
    res.status(400);
    throw new Error("There was an error updating address", error.message);
  }
};

export const deleteOwnerController = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(404);
    throw new Error("Email not found in params");
  }

  try {
    const owner = await businessOwnerServices.deleteOwner(email);
    res.status(200).json({ message: `Business ${owner.business} deleted` });
  } catch (error) {
    res.status(400);
    throw new Error("There was an error updating address", error.message);
  }
};
