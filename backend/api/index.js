import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "../lib/db.js";
import analyticsRoutes from "../routes/analytics.route.js";
import vendorRoutes from "../routes/vendor.route.js";
import petMatingRoutes from "../routes/petMating.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow only your frontend
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin/vendors", vendorRoutes);
app.use("/api/pet-mating", petMatingRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
