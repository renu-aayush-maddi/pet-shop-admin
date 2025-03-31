import { useState } from 'react';
// import { addPet } from '../services/petService';

const PetForm = () => {
    const [pet, setPet] = useState({ category: '', breedName: '', gender: '', age: '', price: '', location: '', breederName: '', phoneNumber: '' });

    const handleChange = (e) => setPet({ ...pet, [e.target.name]: e.target.value });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await addPet(pet);
    //     alert('Pet Added');
    // };
w
    return (
        <form >
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <input type="text" name="breedName" placeholder="Breed Name" onChange={handleChange} required />
            <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="text" name="breederName" placeholder="Breeder Name" onChange={handleChange} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit">Add Pet</button>
        </form>
    );
};

export default PetForm;
