import express from "express";
import {
  getAllPetsForMating,
  getPetById,
  createPetMating,
  updatePetMating,
  deletePetMating,
} from "../controllers/petMating.controller.js";

const router = express.Router();

// @route GET /api/pet-mating?type=Dog
// @desc Get all pet mating pairs of the same type, sorted by breed
router.get("/", getAllPetsForMating);

// @route GET /api/pet-mating/:id
// @desc Get a pet mating pair by ID
router.get("/:id", getPetById);

// @route POST /api/pet-mating
// @desc Add a new pet mating pair
router.post("/", createPetMating);

// @route PUT /api/pet-mating/:id
// @desc Update a pet mating pair
router.put("/:id", updatePetMating);

// @route DELETE /api/pet-mating/:id
// @desc Remove a pet mating pair
router.delete("/:id", deletePetMating);

export default router;
