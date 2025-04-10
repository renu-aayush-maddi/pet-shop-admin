import express from "express";
import { signup, updateprofile, getAllUsers,deleteUser,updateUser,createUser} from "../controllers/user.controller.js";


const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.put("/profile", updateprofile); // removed `protect`

// Admin routes (no auth middleware)
router.get("/admin/users", getAllUsers);
router.post("/admin/users", createUser);
router.put("/admin/users/:id", updateUser);
router.delete("/admin/users/:id", deleteUser);

export default router;
