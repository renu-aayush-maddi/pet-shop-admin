import Vendor from "../models/vendor.model.js";

// @desc Get all vendors
// @route GET /api/admin/vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get vendor by ID
// @route GET /api/admin/vendors/:id
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new vendor
// @route POST /api/admin/vendors
export const createVendor = async (req, res) => {
  try {
    const { name, email, phone, shopName, address } = req.body;
    const vendor = await Vendor.create({
      name,
      email,
      phone,
      shopName,
      address,
    });
    res.status(201).json({ message: "Vendor created successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a vendor
// @route PUT /api/admin/vendors/:id
export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor updated successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a vendor
// @route DELETE /api/admin/vendors/:id
export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
