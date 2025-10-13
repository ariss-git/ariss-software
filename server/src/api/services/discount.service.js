import { v4 as uuid } from "uuid";
import prisma from "../../lib/orm.js";
import { createNotification } from "./notification.service.js";

export class DiscountService {
  async assignDiscount(type, expiryDate, dealerId, productId, panelUserId) {
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
        expiry_date: expiryDate,
        admin_id: dealerId,
        product_id: productId,
        panel_user_id: panelUserId,
      },
      include: {
        admin: {
          select: {
            business: true,
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
      `Discount has been assigned to ${discount.admin.business}`,
      discount.panelUser.fullname
    );

    return discount;
  }
}
