import { BusinessEmployeeService } from "../../services/customers/business-employee.service.js";

const businessEmployee = new BusinessEmployeeService();

export const registerEmployeeController = async (req, res) => {
  const { phone, email, name, role, dealerId, otp } = req.body;
  const data = { phone, email, name, role, dealerId, otp };

  if (!data) {
    return res.status(500).json({ message: "Fields are missing" });
  }

  try {
    const employee = await businessEmployee.registerEmployee(
      email,
      phone,
      name,
      role,
      dealerId,
      otp
    );
    res.status(201).json({
      message: `${employee.role} account has registered`,
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
