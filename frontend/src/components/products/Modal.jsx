import { useState } from "react";

const Modal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[9] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-center text-black">
          Edit Product ✨
        </h2>

        <div className="space-y-2">
          {["name", "category", "price", "stock", "sales"].map((field) => (
            <input
              key={field}
              type={
                field === "name" || field === "category" ? "text" : "number"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 border border-gray-300 rounded text-black placeholder-gray-500"
            />
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-black rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
            Save 💾
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
