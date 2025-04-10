import Product from "../models/product.model.js";

const ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  },
  createProduct: async (req, res) => {
    try {
      console.log(req.body);

      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  },
};

export default ProductController;
