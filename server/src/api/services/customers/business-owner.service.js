import { CustomerType } from "@prisma/client";
import prisma from "../../../lib/orm.js";
import { v4 as uuid } from "uuid";
import { createNotification } from "../notification.service.js";
import { verifyOTP } from "../otp.service.js";
import { waitForApproval } from "../../../email-messages/business-approval.js";

export class BusinessOwnerService {
  async registerOwner(
    email,
    phone,
    name,
    gstin,
    business,
    shippingAddress,
    billingAddress,
    otp
  ) {
    const existing = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (existing) throw new Error("Business owner account already exist");

    if (!(await verifyOTP(email, otp))) {
      console.error("Invalid OTP");
      throw new Error("Invalid or expired OTP");
    }

    const owner = await prisma.customer.create({
      data: {
        id: `dealer-${uuid()}`,
        email,
        phone,
        name,
        role: CustomerType.DEALER,
        gstin,
        business,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      },
    });

    await createNotification(
      "Dealer account registration",
      `New ${owner.business} is waiting for your approval`,
      null
    );

    await waitForApproval(email);

    return owner;
  }

  async fetchAllApproved() {
    return await prisma.customer.findMany({
      where: {
        role: CustomerType.DEALER,
        is_approved: true,
      },
    });
  }

  async fetchAllNonApproved() {
    return await prisma.customer.findMany({
      where: {
        role: CustomerType.DEALER,
        is_approved: false,
      },
    });
  }

  async updateOwnerAddress(shippingAddress, billingAddress, email) {
    const existing = await prisma.customer.findUnique({
      where: {
        email,
        role: CustomerType.DEALER,
      },
    });

    if (!existing) throw new Error("Business owner do not exist");

    const owner = await prisma.customer.update({
      where: {
        email,
      },
      data: {
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      },
    });

    await createNotification(
      "Dealer address update",
      `${owner.business} has updated their address`,
      null
    );

    return owner;
  }

  async deleteOwner(email) {
    const owner = await prisma.customer.delete({
      where: {
        email,
        role: CustomerType.DEALER,
      },
    });

    await createNotification(
      "Dealer left",
      `New ${owner.business} has deleted their account`,
      null
    );

    // TODO: Create email notification

    return owner;
  }
}
