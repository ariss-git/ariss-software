import * as businessOwnerControllers from "../../controllers/customers/business-owner.controller.js";
import { Router } from "express";

const ownerRouter = Router();

ownerRouter.post("/register", businessOwnerControllers.registerOwnerController);

ownerRouter.get(
  "/all-approved",
  businessOwnerControllers.fetchAllApprovedController
);
ownerRouter.get(
  "/all-nonapproved",
  businessOwnerControllers.fetchAllNonApprovedController
);

ownerRouter.put(
  "/change-address/:email",
  businessOwnerControllers.updateOwnerAddressController
);

ownerRouter.delete(
  "/remove/:email",
  businessOwnerControllers.deleteOwnerController
);

export default ownerRouter;
