import prisma from "../../../lib/orm.js";
import { v4 as uuid } from "uuid";
import { createNotification } from "../notification.service.js";

export class ProductService {
  async addProduct(
    title,
    price,
    sku,
    visibility,
    type,
    label,
    warranty,
    quantity,
    usps,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId
  ) {
    const existing = await prisma.product.findUnique({
      where: {
        title,
      },
    });

    if (existing) throw new Error("Product already exist");

    const product = await prisma.product.create({
      data: {
        id: `prod-${uuid()}`,
        title,
        price,
        sku,
        visibility,
        type,
        label,
        warranty,
        quantity,
        usps,
        keywords,
        description,
        images,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        panel_user_id: panelUserId,
      },
      include: {
        panelUser: {
          select: {
            fullname: true,
          },
        },
      },
    });

    createNotification(
      "Product added",
      `New product ${product.title} added to the stocks`,
      product.panelUser.fullname
    );

    return product;
  }

  async fetchAllProducts() {
    return await prisma.product.findMany({
      include: {
        category: {
          select: {
            title: true,
          },
        },
        subcategory: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async fetchSingleProduct(id) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
        subcategory: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!product) throw new Error("Product do no exist");

    return product;
  }

  async updateProduct(
    id,
    title,
    price,
    sku,
    visibility,
    type,
    label,
    warranty,
    quantity,
    usps,
    keywords,
    description,
    images,
    categoryId,
    subcategoryId,
    panelUserId
  ) {
    const existing = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existing) throw new Error("Product do no exist");

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        price,
        sku,
        visibility,
        type,
        label,
        warranty,
        quantity,
        usps,
        keywords,
        description,
        images,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        panel_user_id: panelUserId,
      },
    });

    createNotification(
      "Product updated",
      `Product ${product.title} has been updated`,
      product.panel_user_id
    );

    return product;
  }

  async deleteProduct(id, panelUserId) {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const product = await prisma.product.delete({
      where: {
        id,
      },
      include: {
        panelUser: {
          select: {
            fullname: true,
          },
        },
      },
    });

    createNotification(
      "Product deleted",
      `Product ${product.title} has been deleted`,
      product.panelUser.fullname
    );

    return product;
  }
}
