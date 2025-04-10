import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import PetForm from "./PetForm";
import Modal from "./Modal";
import axios from "../../lib/axios.js";
import AddProductModal from './AddProductModal';

const ProductsTable = ({ PRODUCT_DATA }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
  const [showFormModal, setShowFormModal] = useState(false); // Add modal visibility for adding products
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setFilteredProducts(PRODUCT_DATA);
  }, [PRODUCT_DATA]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setShowFormModal(true); // Show modal for adding product
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setFilteredProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed, darling 💔", err);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const { data } = await axios.put(
        `/products/${updatedProduct._id}`,
        updatedProduct
      );
      const updatedList = filteredProducts.map((p) =>
        p._id === data._id ? data : p
      );
      setFilteredProducts(updatedList);
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Update failed, sweetheart 💥", err);
    }
  };

  const handleSaveNewProduct = async (newProduct) => {
    try {
      const { data } = await axios.post(`/products/`, newProduct);
      setFilteredProducts((prev) => [...prev, data]);
      setShowFormModal(false);
    } catch (err) {
      console.error("Adding product failed, honey 🍯", err);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search products..."
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
            onClick={handleAddProduct}>
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {showFormModal && (
        <AddProductModal
          onClose={() => setShowFormModal(false)}
          onSave={handleSaveNewProduct}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src={product.image}
                    alt="Product img"
                    className="size-10 rounded-full"
                  />
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${product.price?.toFixed(2)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.stock ?? "—"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.sales ?? "—"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(product)}>
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(product._id)}>
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

export default ProductsTable;
