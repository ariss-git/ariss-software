import { PanelUserService } from "../services/panel-user.service.js";

const panelUserServices = new PanelUserService();

export const registerPanelUserController = async (req, res) => {
  const { clerkId, email, fullname, role } = req.body;

  if (!clerkId || !email || !fullname || !role) {
    console.log("All required fields are missing key or values");
    return res
      .status(500)
      .json({ message: "All required fields are missing key or values" });
  }

  try {
    const panelUser = await panelUserServices.registerPanelUser(
      clerkId,
      email,
      fullname,
      role
    );
    res
      .status(201)
      .json({ message: "Panel user added to db", data: panelUser });
    console.log("Panel user added to db");
  } catch (error) {
    console.log("Error registering the panel user");
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllPanelUsersController = async (_req, res) => {
  try {
    const panelUser = await panelUserServices.fetchAllPanelUsers();
    res.status(200).json({ total: panelUser.length, data: panelUser });
  } catch (error) {
    console.log("Error fetching all the panel users");
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllAdminController = async (_req, res) => {
  try {
    const panelUser = await panelUserServices.fetchAllAdmin();
    res.status(200).json({ total: panelUser.length, data: panelUser });
  } catch (error) {
    console.log("Error fetching all the admin users");
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllEmployeeController = async (_req, res) => {
  try {
    const panelUser = await panelUserServices.fetchAllEmployee();
    res.status(200).json({ total: panelUser.length, data: panelUser });
  } catch (error) {
    console.log("Error fetching all the employee users");
    res.status(500).json({ message: error.message });
  }
};
