import { v4 as uuid } from "uuid";
import prisma from "../../lib/orm.js";
import { createNotification } from "./notification.service.js";
import { RMAStatus } from "@prisma/client";

export class ReturnService {
  async createReturnRequest(productName, modelNo, issue, images, customerId) {
    const existing = await prisma.return.findUnique({
      where: {
        model_number: modelNo,
      },
    });

    if (existing) throw new Error("RMA is already requested and under review");

    const rma = await prisma.return.create({
      data: {
        id: `rma-${uuid()}`,
        product_name: productName,
        model_number: modelNo,
        issue,
        images,
        customer_id: customerId,
      },
      include: {
        customer: {
          select: {
            business: true,
            dealer_user: {
              select: {
                business: true,
              },
            },
          },
        },
      },
    });

    await createNotification(
      "RMA Request",
      `${rma.customer.business} or ${rma.customer.dealer_user.business} has sent a request to return a product`,
      null
    );

    return rma;
  }

  async fetchAllReturns() {
    await prisma.return.findMany({
      include: {
        customer: {
          select: {
            business: true,
            dealer_user: {
              select: {
                business: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async approveReturnRequest(id) {
    const rma = await prisma.return.update({
      where: {
        id,
      },
      data: {
        status: RMAStatus.APPROVE,
      },
      include: {
        customer: {
          select: {
            business: true,
            dealer_user: {
              select: {
                business: true,
              },
            },
          },
        },
      },
    });

    await createNotification(
      "RMA Request Accepted",
      `RMA Request of ${rma.customer.business} (${rma.customer.dealer_user.business}) has been approved`,
      null
    );

    return rma;
  }

  async rejectReturnRequest(id) {
    const rma = await prisma.return.update({
      where: {
        id,
      },
      data: {
        status: RMAStatus.REJECT,
      },
      include: {
        customer: {
          select: {
            business: true,
            dealer_user: {
              select: {
                business: true,
              },
            },
          },
        },
      },
    });

    await createNotification(
      "RMA Request Declined",
      `RMA Request of ${rma.customer.business} (${rma.customer.dealer_user.business}) has been rejected`,
      null
    );

    return rma;
  }

  async deleteReturnRequest(id) {
    const rma = await prisma.return.delete({
      where: {
        id,
      },
      include: {
        customer: {
          select: {
            business: true,
            dealer_user: {
              select: {
                business: true,
              },
            },
          },
        },
      },
    });

    await createNotification(
      "RMA Deleted",
      `RMA Request of ${rma.customer.business} (${rma.customer.dealer_user.business}) has been removed permanently`,
      null
    );

    return rma;
  }
}
