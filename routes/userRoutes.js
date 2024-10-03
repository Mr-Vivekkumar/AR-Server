const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user or admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Users]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/admin/delete-user:
 *   post:
 *     tags: [Users]
 *     summary: Delete a user by admin
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/all-users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Access denied
 */

// User registration with conditional admin registration
router.post("/register", (req, res, next) => {
    const { userType } = req.body;
    if (userType === 'admin') {
        return userController.registerAdmin(req, res); // Call registerAdmin if userType is admin
    } else {
        return userController.registerUser(req, res); // Call registerUser otherwise
    }
});

// User login
router.post("/login", userController.loginUser);

// Admin delete user
router.post("/admin/delete-user", authenticateJWT, userController.deleteUser);

// Admin view all users
router.get("/admin/all-users", authenticateJWT, userController.getAllUsers);

module.exports = router;
