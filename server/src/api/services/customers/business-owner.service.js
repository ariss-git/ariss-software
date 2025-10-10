import { CustomerType } from "@prisma/client";
import prisma from "../../../lib/orm.js";
import { v4 as uuid } from "uuid";
import { createNotification } from "../notification.service.js";

export class BusinessOwnerService {
  async registerOwner(
    email,
    phone,
    name,
    gstin,
    business,
    shippingAddress,
    billingAddress
  ) {
    const existing = await prisma.customer.findUnique({
      where: {
        OR: [
          {
            email,
            role: CustomerType.DEALER,
          },
          {
            phone,
            role: CustomerType.DEALER,
          },
        ],
      },
    });

    if (existing) throw new Error("Business owner account already exist");

    // TODO: OTP verification

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
    return await prisma.customer.delete({
      where: {
        email,
        role: CustomerType.DEALER,
      },
    });
  }
}
