import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import VendorsTable from "../components/vendors/VendorsTable.jsx";

const vendorStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const VendorsPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]); // 💡 Use an object, not array, if you're setting one item
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/vendors");
        console.log("Raw response 💫:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching analytics data 😢:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <StatCard
            name="Total Vendors"
            icon={UsersIcon}
            value={vendorStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Vendors Today"
            icon={UserPlus}
            value={vendorStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Vendors"
            icon={UserCheck}
            value={vendorStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={vendorStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

              <VendorsTable vendorData={user} />

        {/* USER CHARTS */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div> */}
      </main>
    </div>
  );
};
export default VendorsPage;
