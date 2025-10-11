import prisma from "../../../lib/orm.js";
import { createNotification } from "../notification.service.js";
import { v4 as uuid } from "uuid";

export class CategoryService {
  async addCategory(title, description, image, panelUserId) {
    const exisiting = await prisma.category.findUnique({
      where: {
        title,
      },
    });

    if (exisiting) throw new Error("Category already exists");

    const category = await prisma.category.create({
      data: {
        id: `category-${uuid()}`,
        title,
        description,
        image,
        panel_user_id: panelUserId,
      },
      include: {
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    createNotification(
      "Category added",
      `New ${category.title} added to the stocks`,
      category.panel_user.fullname
    );

    return category;
  }

  async getAllCategory() {
    return await prisma.category.findMany();
  }

  async getSingleCategory(id) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Category do not exist");

    return category;
  }

  async updateCategory(id, title, description, image, panelUserId) {
    const exisiting = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!exisiting) throw new Error("Category do not exist");

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
        panel_user_id: panelUserId,
      },
      include: {
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    createNotification(
      "Category updated",
      `${category.title} has some new changes`,
      category.panel_user.fullname
    );

    return category;
  }

  async deleteCategory(id, panelUserId) {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const category = await prisma.category.delete({
      where: {
        id,
        panel_user_id: panelUserId,
      },
      include: {
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    createNotification(
      "Category delete",
      `${category.title} has been deleted permanently`,
      category.panel_user.fullname
    );

    return category;
  }
}
