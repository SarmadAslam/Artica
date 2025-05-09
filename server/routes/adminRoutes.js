import { Router } from "express";
import { adminLogin } from "../controllers/admin-controller/adminAuthController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.post("/admin/login", adminLogin); // POST /api/admin/login

router.get("/dashboard", requireAdmin, (req, res) => {
    res.json({
      message: "Welcome to the Admin Dashboard",
      admin: req.user,
    });
  });

export default router;
