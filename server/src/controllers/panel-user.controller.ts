import { Request, Response } from "express";
import { PanelUserClass } from "../services/panel-user.service";

const panelUserServices = new PanelUserClass();

// Controller to create panel user
export const createPanelUserController = async (
  req: Request,
  res: Response
) => {
  const { id, email, fullname, profilePic, role } = req.body;

  if (!id || !email || !fullname || !profilePic || !role) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const user = await panelUserServices.createPanelUser(
      id,
      email,
      fullname,
      profilePic,
      role
    );
    res.status(201).json({ message: "Panel user created", data: user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to fetch all admin panel users
export const fetchAllAdminsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const user = await panelUserServices.fetchAllAdmins();
    res.status(200).json({ total: user.length, data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to fetch all employee panel users
export const fetchAllEmployeesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const user = await panelUserServices.fetchAllEmployees();
    res.status(200).json({ total: user.length, data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a panel users
export const deletePanelUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID is missing from params" });
  }

  try {
    const user = await panelUserServices.deletePanelUser(id);
    res.status(200).json({ message: "Panel user deleted", data: user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
