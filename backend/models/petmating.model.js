import mongoose from "mongoose";

const petMatingSchema = new mongoose.Schema({
  pet1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  pet2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  matingDate: { type: Date, default: Date.now },
});

const PetMating = mongoose.model("PetMating", petMatingSchema);
export default PetMating;
