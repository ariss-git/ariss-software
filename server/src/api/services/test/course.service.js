import { v4 as uuid } from "uuid";
import { createNotification } from "../notification.service.js";
import prisma from "../../../lib/orm.js";

export class courseService {
  async createCourse(title, description, content, panelUserId) {
    const existing = await prisma.course.findUnique({
      where: {
        title,
      },
    });

    if (existing) throw new Error("Course already exists");

    const course = await prisma.course.create({
      data: {
        id: `course-${uuid()}`,
        title,
        description,
        content,
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

    await createNotification(
      "Course created",
      `New course has been added. Admin users are requested to review and approve the course`,
      course.panelUser.fullname
    );

    return course;
  }

  async fetchAllCourse() {
    return await prisma.course.findMany();
  }

  async fetchSingleCourse(id) {
    return await prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteCourse(id, panelUserId) {
    await prisma.course.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const course = await prisma.course.delete({
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

    await createNotification(
      "Course Deleted",
      `${course.title} has been removed permanently`,
      course.panelUser.fullname
    );

    return course;
  }
}
