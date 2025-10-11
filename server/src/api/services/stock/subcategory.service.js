import prisma from "../../../lib/orm.js";
import { createNotification } from "../notification.service.js";
import { v4 as uuid } from "uuid";

export class SubCategoryService {
  async addSubcategory(title, description, image, categoryId, panelUserId) {
    const exisiting = await prisma.subcategory.findUnique({
      where: {
        title,
      },
    });

    if (exisiting) throw new Error("Subcategory already exists");

    const subcategory = await prisma.subcategory.create({
      data: {
        id: `subcategory-${uuid()}`,
        title,
        description,
        image,
        category_id: categoryId,
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
      "Subcategory added",
      `New ${subcategory.title} added to the stocks`,
      subcategory.panel_user.fullname
    );

    return subcategory;
  }

  async getAllSubcategory() {
    return await prisma.subcategory.findMany({
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getSingleSubcategory(id) {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!subcategory) throw new Error("Subcategory do not exist");

    return subcategory;
  }

  async updateSubcategory(
    id,
    title,
    description,
    image,
    categoryId,
    panelUserId
  ) {
    const exisiting = await prisma.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!exisiting) throw new Error("Subcategory do not exist");

    const subcategory = await prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
        category_id: categoryId,
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
      "Subcategory updated",
      `${subcategory.title} has some new changes`,
      subcategory.panel_user.fullname
    );

    return subcategory;
  }

  async deleteSubcategory(id, panelUserId) {
    const subcategory = await prisma.subcategory.delete({
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
      "Subcategory delete",
      `${subcategory.title} has been deleted permanently`,
      subcategory.panel_user.fullname
    );

    return subcategory;
  }
}
