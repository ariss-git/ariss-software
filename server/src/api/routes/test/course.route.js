import { Router } from "express";
import * as courseControllers from "../../controllers/test/course.controller.js";

const courseRouter = Router();

courseRouter.post("/create", courseControllers.createCourseController);

courseRouter.get("/all", courseControllers.fetchAllCourseController);
courseRouter.get("/:id", courseControllers.fetchSingleCourseController);

courseRouter.patch(
  "/approve/:id/:panelId",
  courseControllers.approveCourseController
);
courseRouter.patch(
  "/reject/:id/:panelId",
  courseControllers.rejectCourseController
);

courseRouter.put(
  "/update/:id/:panelId",
  courseControllers.updateCourseController
);

courseRouter.delete(
  "/delete/:id/:panelId",
  courseControllers.deleteCourseController
);

export default courseRouter;
