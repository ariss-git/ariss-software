import { v4 as uuid } from "uuid";
import prisma from "../../lib/orm.js";
import { createNotification } from "./notification.service.js";

export class DiscountService {
  async assignDiscount(
    type,
    expiryDate,
    amount,
    dealerId,
    productId,
    panelUserId
  ) {
    const existing = await prisma.discount.findUnique({
      where: {
        admin_id: dealerId,
        product_id: productId,
      },
    });

    if (existing) throw new Error("Discount is already assigned to the user");

    const discount = await prisma.discount.create({
      data: {
        id: `coupon-${uuid()}`,
        type,
        amount,
        expiry_date: expiryDate,
        admin_id: dealerId,
        product_id: productId,
        panel_user_id: panelUserId,
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            title: true,
          },
        },
        panelUser: {
          select: {
            fullname: true,
          },
        },
      },
    });

    await createNotification(
      "Discount Assigned",
      `Discount has been assigned to ${discount.admin.business} on ${discount.product.title}`,
      discount.panelUser.fullname
    );

    return discount;
  }

  async fetchAllDiscounts() {
    return await prisma.discount.findMany({
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async fetchSingleDiscount(id) {
    const discount = await prisma.discount.findUnique({
      where: {
        id,
      },
    });

    if (!discount) throw new Error("Discount do not exist");

    return discount;
  }

  async deleteDiscount(id, panelUserId) {
    await prisma.discount.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const discount = await prisma.discount.delete({
      where: {
        id,
      },
      include: {
        panelUser: {
          select: {
            fullname: true,
          },
        },
        admin: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            title: true,
          },
        },
      },
    });

    await createNotification(
      "Discount Opted",
      `Discount deleted for ${discount.admin.name} on ${discount.product.title}`,
      discount.panelUser.fullname
    );

    return discount;
  }
}
