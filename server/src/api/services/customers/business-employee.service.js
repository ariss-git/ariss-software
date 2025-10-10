import prisma from "../../../lib/orm.js";
import { createNotification } from "../notification.service.js";
import { verifyOTP } from "../otp.service.js";

export class BusinessEmployeeService {
  async registerEmployee(email, phone, name, role, dealerId, otp) {
    const existing = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (existing) throw new Error("User with this account already exist");

    if (!(await verifyOTP(email, otp))) {
      console.error("Invalid OTP");
      throw new Error("Invalid or expired OTP");
    }

    const employee = await prisma.customer.create({
      data: {
        phone,
        email,
        name,
        role,
        dealer_id: dealerId,
      },
      include: {
        dealer_user: {
          select: {
            business: true,
          },
        },
      },
    });

    const lowered = employee.role.toLowerCase();
    const capitalized = lowered.charAt(0).toUpperCase() + lowered.slice(1);

    await createNotification(
      `${capitalized} account registration`,
      `New ${employee.dealer_user.business} is waiting for your approval`,
      null
    );

    return employee;
  }
}
