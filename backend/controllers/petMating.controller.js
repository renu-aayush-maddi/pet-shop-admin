import PetMating from "../models/petmating.model.js";
import mongoose from "mongoose";

// @desc Get all pet mating pairs, filtered by type, sorted by breed
// @route GET /api/pet-mating
export const getAllPetsForMating = async (req, res) => {
  try {
    const { type } = req.query; // Filter by type (e.g., Dog, Cat)

    if (!type) {
      return res.status(400).json({ message: "Pet type is required" });
    }

    const pairs = await PetMating.find({
      $or: [{ "pet1.type": type }, { "pet2.type": type }],
    }).sort({ "pet1.breed": 1, "pet2.breed": 1 }); // Sort by breed

    res.status(200).json(pairs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a pet mating pair by ID
// @route GET /api/pet-mating/:id
export const getPetById = async (req, res) => {
  try {
    const pair = await PetMating.findById(req.params.id);
    if (!pair) return res.status(404).json({ message: "Pet pair not found" });
    res.status(200).json(pair);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new pet mating pair
// @route POST /api/pet-mating
export const createPetMating = async (req, res) => {
  try {
    const { pet1, pet2 } = req.body;

    if (!pet1 || !pet2) {
      return res.status(400).json({ message: "Both pet IDs must be provided" });
    }

    // Ensure pet1 and pet2 are valid MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(pet1) ||
      !mongoose.Types.ObjectId.isValid(pet2)
    ) {
      return res.status(400).json({ message: "Invalid pet ID format" });
    }

    const matingPair = new PetMating({ pet1, pet2 });
    await matingPair.save();

    res.status(201).json({ message: "Pet pair added for mating", matingPair });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a pet mating pair
// @route PUT /api/pet-mating/:id
export const updatePetMating = async (req, res) => {
  try {
    const pair = await PetMating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pair) return res.status(404).json({ message: "Pet pair not found" });
    res.status(200).json({ message: "Pet pair updated successfully", pair });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a pet mating pair
// @route DELETE /api/pet-mating/:id
export const deletePetMating = async (req, res) => {
  try {
    const pair = await PetMating.findByIdAndDelete(req.params.id);
    if (!pair) return res.status(404).json({ message: "Pet pair not found" });
    res.status(200).json({ message: "Pet pair removed from mating list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
