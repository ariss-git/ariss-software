import * as productControllers from "../../controllers/stock/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/add", productControllers.addProductController);

productRouter.get("/all", productControllers.fetchAllProductsController);
productRouter.get("/:id", productControllers.fetchSingleProductController);

productRouter.put("/update/:id", productControllers.updateProductController);

productRouter.delete(
  "/delete/:id/:panelId",
  productControllers.deleteProductController
);

export default productRouter;
