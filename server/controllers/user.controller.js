import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt'
import db from '../config/db.js'
import generateToken from '../config/token.js';
import 'dotenv/config'

export const signup = async (req, res) => {
    if (req.body.profile_image !== '') {
        const { profile_image } = req.files;
        if (!req.files || Object.keys(req.files).length === 0 || !profile_image) {
            return res.status(400).json({ success: false, messege: 'No file uploaded' });
        }
        const { name, email, password, phone, role } = req.body;
        if (!name) {
            return res.status(400).json("Please enter the name")
        }
        if (!email) {
            return res.status(400).json("Please enter the email")
        }
        if (!password) {
            return res.status(400).json("Please enter the password")
        }
        if (!role) {
            return res.status(400).json("Please select user role")
        }
        if (password.length < 8) {
            return res.status(400).json("Password contains 8 characters long")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
        if (!allowedFormat.includes(profile_image.mimetype)) {
            return res.status(400).json({ success: false, messege: "Invalid Format! Only jpg, jpeg, png, webp are allowed" })
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(profile_image.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error)
        }
        const imgUrl = cloudinaryResponse.url;
        const sql = 'INSERT INTO users(`name`,`email`,`password`,`phone`,`profile_image`,`role`) VALUES(?)';
        const values = [
            name,
            email,
            hashPassword,
            phone,
            JSON.stringify(imgUrl),
            role
        ]
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ success: false, messege: "Email already exist" })
            } else {
                return res.status(201).json({ success: true, messege: "Signup Successfully" })
            }
        })
        return
    }
    const { email, password, name, phone, role } = req.body;
    if (!name) {
        return res.status(400).json("Please enter the name")
    }
    if (!email) {
        return res.status(400).json("Please enter the email")
    }
    if (!password) {
        return res.status(400).json("Please enter the password")
    }
    if (!role) {
        return res.status(400).json("Please select user role")
    }
    if (password.length < 2) {
        return res.status(400).json("Password contains 2 characters long")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users(`name`,`email`,`password`,`phone`,`role`) VALUES(?)';
    const values = [
        name,
        email,
        hashPassword,
        phone,
        role
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, messege: "Email already exist" })
        } else {
            res.status(201).json({ success: true, messege: "Signup Successfully" })
        }
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json("Please enter your email")
    }
    if (!password) {
        return res.status(400).json("Please enter your password")
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, email, async (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, messege: "Error in login: " + err })
        }
        if (data.length > 0) {
            let isMatch = await bcrypt.compare(password, data[0].password);
            if (!isMatch) {
                return res.status(400).json("Incorrect Password")
            }
            let token = generateToken(data[0]._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })
            res.status(200).json({ success: true, messege: `Welcome back ${data[0].name}`, data, token, expiresIn: 86400 })
        } else {
            return res.status(400).json("No email exist")
        }
    })
}

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