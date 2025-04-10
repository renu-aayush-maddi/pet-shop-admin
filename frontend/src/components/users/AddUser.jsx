import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    userType: "Client",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/admin/users", formData); // Update your endpoint if needed
      setMessage(res.data.message);
      setFormData({ fullname: "", email: "", password: "", userType: "Client" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Add New User</h2>
      {message && <p className="text-center text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
          <option value="Vendor">Vendor</option>
          <option value="Driver">Driver</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
