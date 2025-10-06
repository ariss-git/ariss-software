import { panel_user_type } from "@prisma/client";
import prisma from "../lib/db";

export class PanelUserClass {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  // Service to create a panel user
  async createPanelUser(
    id: string,
    email: string,
    fullname: string,
    profilePic: string,
    role: panel_user_type
  ) {
    const existingUser = await this.prismaClient.panel_user.findUnique({
      where: {
        email,
      },
    });

    // If user exist throw error
    if (existingUser) throw new Error("User already exist");

    // Create and return panel user
    const user = await this.prismaClient.panel_user.create({
      data: {
        panel_user_id: id,
        email,
        fullname,
        profile_picture: profilePic,
        role,
      },
    });

    return user;
  }

  // Service to fetch all admin users
  async fetchAllAdmins() {
    return await this.prismaClient.panel_user.findMany({
      where: {
        role: panel_user_type.ADMIN,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  // Service to fetch all employee users
  async fetchAllEmployees() {
    return await this.prismaClient.panel_user.findMany({
      where: {
        role: panel_user_type.EMPLOYEE,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  // Service to delete single user
  async deletePanelUser(id: string) {
    const existingUser = await this.prismaClient.panel_user.findUnique({
      where: {
        panel_user_id: id,
      },
    });

    // If user doesn't exist throw error
    if (!existingUser) throw new Error("User do not exist");

    // Delete panel user and return
    const user = await this.prismaClient.panel_user.delete({
      where: {
        panel_user_id: id,
      },
    });

    return user;
  }
}
