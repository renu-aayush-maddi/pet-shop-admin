import React, { useState } from "react";

const AddProductModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    isFeatured: false,
    stock: 0,
    sales: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // You can handle form submission in parent
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative z-[10000]">
        <h2 className="text-xl font-bold mb-4">Add New Product 💎</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
            required
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-5 w-5 text-green-500"
            />
            <label htmlFor="isFeatured">✨ Featured Product</label>
          </div>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
          />
          <input
            type="number"
            name="sales"
            placeholder="Sales"
            value={formData.sales}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded shadow">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
