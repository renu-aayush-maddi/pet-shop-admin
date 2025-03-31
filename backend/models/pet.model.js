import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    category: { type: String, required: true },
    breedName: { type: String, required: true },
    gender: { type: String, required: true },
    petQuality: { type: String, required: true },
    age: { type: Number, required: true },
    breedLineage: { type: String, required: true },
    vaccinationDetails: { type: String, required: true },
    availability: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    breederName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopAddress: { type: String, required: true },
    photos: { type: [String], required: true },
    videos: { type: [String], required: true },
    vaccinationProof: { type: String, required: true }
});


const Pet = mongoose.model("Pet",petSchema);

export default Pet;
