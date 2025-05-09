import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, getUserStats, createUser } from '../../controllers/admin-controller/userController.js';

import { requireAdmin } from "../../middleware/requireAdmin.js";
import { adminLogin } from "../../controllers/admin-controller/adminAuthController.js";

const router = Router();

// Protect routes with isAdmin middleware
// router.get('/user', isAdmin, getAllUsers);
// router.get('/user/:id', isAdmin, getUserById);
// router.put('/user/:id', isAdmin, updateUser);
// router.delete('/user/:id', isAdmin, deleteUser);

router.get('/users', getAllUsers);
router.get('/users/stats', getUserStats);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user', createUser);

// Admin login route
router.post("/login", adminLogin);

// Example protected route
router.get("/dashboard", requireAdmin, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.user });
  });

export default router;