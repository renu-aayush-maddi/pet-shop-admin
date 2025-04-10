import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import axios from "../../lib/axios.js";
// const vendorData = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Customer",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "Admin",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     role: "Customer",
//     status: "Inactive",
//   },
//   {
//     id: 4,
//     name: "Alice Brown",
//     email: "alice@example.com",
//     role: "Customer",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Charlie Wilson",
//     email: "charlie@example.com",
//     role: "Moderator",
//     status: "Active",
//   },
// ];

const VendorsTable = ({ vendorData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState(vendorData);
  const [showFormModal, setShowFormModal] = useState(false); // Add modal visibility for adding products
  const [SelectedVendor, setSelectedVendor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setFilteredVendors(vendorData);
  }, [vendorData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = vendorData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredVendors(filtered);
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor); // change to vendor
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vendors/${id}`);
      setFilteredVendors((prev) => prev.filter((v) => v._id !== id)); // 'v' for vendor 😘
    } catch (err) {
      console.error("Delete failed, darling 💔", err);
    }
  };

  const handleUpdate = async (updatedVendor) => {
    try {
      const { data } = await axios.put(
        `/vendors/${updatedVendor._id}`,
        updatedVendor
      );
      const updatedList = filteredVendors.map((v) =>
        v._id === data._id ? data : v
      );
      setFilteredVendors(updatedList);
      setShowEditModal(false);
      setSelectedVendor(null);
    } catch (err) {
      console.error("Update failed, sweetheart 💥", err);
    }
  };

  const handleSaveNewVendor = async (newVendor) => {
    try {
      const { data } = await axios.post(`/vendors/`, newVendor);
      setFilteredVendors((prev) => [...prev, data]);
      setShowFormModal(false);
    } catch (err) {
      console.error("Adding vendor failed, honey 🍯", err);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Vendors</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search Vendors..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <button
            className="bg-green-500 text-white rounded-full p-2 hover:bg-green-400 focus:outline-none"
            onClick={handleSaveNewVendor}>
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Shop Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Owner Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredVendors.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.shopName.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {user.shopName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.ownerName}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      // check if user.approved is true or false
                      user.approved === true
                        ? "bg-green-800 text-green-100"
                        : "bg-red-800 text-red-100"
                    }`}>
                    {user.approved === true ? "Approved" : "Pending"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(user)}>
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(user._id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default VendorsTable;
