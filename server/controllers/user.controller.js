import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt'
import db from '../config/db.js'
import generateToken from '../config/token.js';
import 'dotenv/config'

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // ✅ Validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, messege: "Please fill required fileds" });
        }
        if(!role) {
            return res.status(400).json({ success: false, messege: "Please select role" });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                messege: "Password must be at least 8 characters"
            });
        }

        // ✅ Check existing user
        const [existing] = await db.query(
            "SELECT _id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length) {
            return res.status(400).json({
                success: false,
                messege: "Email already exists"
            });
        }

        // ✅ Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        let imageUrl = null;

        // ✅ Handle image if exists
        if (req.files && req.files.profile_image) {
            const file = req.files.profile_image;

            const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

            if (!allowedFormat.includes(file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    messege: "Invalid image format"
                });
            }

            const upload = await cloudinary.uploader.upload(file.tempFilePath);

            if (!upload || upload.error) {
                return res.status(500).json({
                    success: false,
                    messege: "Image upload failed"
                });
            }

            imageUrl = upload.secure_url;
        }

        // ✅ Insert user
        const sql = `
      INSERT INTO users (name, email, password, phone, profile_image, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        await db.query(sql, [
            name,
            email,
            hashPassword,
            phone || null,
            imageUrl,
            role
        ]);

        return res.status(201).json({
            success: true,
            messege: "Signup successful"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                messege: "Email and password are required"
            });
        }

        const [data] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (!data.length) {
            return res.status(400).json({
                success: false,
                messege: "Invalid email or password"
            });
        }

        const user = data[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch || email !== req.body.email) {
            return res.status(400).json({
                success: false,
                messege: "Invalid email or password"
            });
        }

        // ✅ Generate token
        const token = generateToken(user._id);

        // ✅ Remove password before sending
        delete user.password;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            messege: `Welcome back ${user.name}`,
            user,
            token,
            expiresIn: 86400
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: err.message
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const sql = 'SELECT * FROM users WHERE _id = ?';
        const [data] = await db.query(sql, [user_id]);

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: "Error in getting user: " + err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const { user_id } = req.params;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                messege: "Please fill required fields"
            });
        }

        let imgUrl = null;

        // ✅ If image exists
        if (req.files && req.files.profile_image) {
            const { profile_image } = req.files;

            const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

            if (!allowedFormat.includes(profile_image.mimetype)) {
                return res.status(400).json({
                    success: false,
                    messege: "Invalid Format! Only jpg, jpeg, png, webp are allowed"
                });
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(
                profile_image.tempFilePath,
                { overwrite: true }
            );

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(500).json({
                    success: false,
                    messege: "Image upload failed"
                });
            }

            imgUrl = cloudinaryResponse.url;
        }

        // ✅ Build query dynamically
        let sql;
        let values;

        if (imgUrl) {
            sql = 'UPDATE users SET name = ?, email = ?, phone = ?, profile_image = ? WHERE _id = ?';
            values = [name, email, phone, imgUrl, user_id];
        } else {
            sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE _id = ?';
            values = [name, email, phone, user_id];
        }

        await db.query(sql, values);

        return res.status(200).json({
            success: true,
            messege: "Profile updated"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            messege: "Error in updating user: " + err.message
        });
    }
};