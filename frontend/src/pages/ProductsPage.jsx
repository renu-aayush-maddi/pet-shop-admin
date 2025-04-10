import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import axios from "../lib/axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]); // 💡 Use an object, not array, if you're setting one item

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/products");
        console.log("Raw response 💫:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching analytics data 😢:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      console.log("Product is ready to shine ✨:", product);
    }
  }, [product]);

  return (
    <div className="flex-1 overflow-visible relative z-0">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <StatCard
            name="Total Products"
            icon={Package}
            value={analyticsData?.products?.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
          />
        </motion.div>

        <ProductsTable PRODUCT_DATA={product} />

        {/* CHARTS */}
        {/* <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div> */}
      </main>
    </div>
  );
};
export default ProductsPage;
