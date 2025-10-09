import { v4 as uuid } from "uuid";
import prisma from "../../lib/orm.js";
import { PanelUserType } from "@prisma/client";
import { createNotification } from "./notification.service.js";

export class PanelUserService {
  async registerPanelUser(clerkId, email, fullname, role) {
    const exisitingUser = await prisma.panelUser.findUnique({
      where: {
        email,
      },
    });

    if (exisitingUser)
      throw new Error("Panel user with this account already exists.");

    const panelUser = await prisma.panelUser.create({
      data: {
        id: `${role.toLowerCase()}-${uuid()}`,
        clerk_id: clerkId,
        email,
        fullname,
        role,
      },
    });

    createNotification(
      "Panel User",
      `New ${
        panelUser.fullname
      } ${panelUser.role.toLowerCase()} has been registered to panel`,
      ""
    );

    return panelUser;
  }

  async fetchAllPanelUsers() {
    return await prisma.panelUser.findMany();
  }

  async fetchAllAdmin() {
    return await prisma.panelUser.findMany({
      where: {
        role: PanelUserType.ADMIN,
      },
    });
  }

  async fetchAllEmployee() {
    return await prisma.panelUser.findMany({
      where: {
        role: PanelUserType.EMPLOYEE,
      },
    });
  }
}
