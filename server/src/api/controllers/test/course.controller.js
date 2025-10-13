import { CourseService } from "../../services/test/course.service.js";

const courseServices = new CourseService();

export const createCourseController = async (req, res) => {
  const { title, description, content, panelUserId } = req.body;
  const data = { title, description, content, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "Missing fields are required" });
  }

  try {
    const course = await courseServices.createCourse(
      title,
      description,
      content,
      panelUserId
    );
    res.status(201).json({ message: "Course created", data: course });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const fetchAllCourseController = async (_req, res) => {
  try {
    const course = await courseServices.fetchAllCourse();
    res.status(200).json({ total: course.length, data: course });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const fetchSingleCourseController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const course = await courseServices.fetchSingleCourse(id);
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const approveCourseController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const course = await courseServices.approveCourse(id, panelId);
    res.status(200).json({ message: "Course approved", data: course });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const rejectCourseController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const course = await courseServices.rejectCourse(id, panelId);
    res.status(200).json({ message: "Course rejected", data: course });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateCourseController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(404).json({ message: "Missing fields are required" });
  }

  try {
    const course = await courseServices.updateCourse(
      id,
      title,
      content,
      panelId
    );
    res.status(200).json({ message: "Course updated", data: course });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteCourseController = async (req, res) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "ID not found in params" });
  }

  try {
    const course = await courseServices.deleteCourse(id, panelId);
    res.status(200).json({ message: "Course deleted", data: course });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
