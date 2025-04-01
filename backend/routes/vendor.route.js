import express from "express";
const router = express.Router();
import * as vendorController from "../controllers/vendor.controller.js";


// Get all vendors
router.get("/", vendorController.getAllVendors);

// Get a single vendor by ID
router.get("/:id", vendorController.getVendorById);

// Create a new vendor
router.post("/", vendorController.createVendor);

// Update vendor details
router.put("/:id", vendorController.updateVendor);

// Delete a vendor
router.delete("/:id", vendorController.deleteVendor);

export default router;
