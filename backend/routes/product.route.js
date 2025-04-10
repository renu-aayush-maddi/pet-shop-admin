import ProductController from "../controllers/product.controller.js";
import express from "express";

const router = express.Router();

// Route to get all products
router.get("/", ProductController.getProducts);
// Route to get a single product by ID
router.get("/:id", ProductController.getProduct);
// Route to create a new product
router.post("/", ProductController.createProduct);
// Route to update a product by ID
router.put("/:id", ProductController.updateProduct);
// Route to delete a product by ID
router.delete("/:id", ProductController.deleteProduct);

export default router;