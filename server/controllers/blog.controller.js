import { v2 as cloudinary } from 'cloudinary'
import db from '../config/db.js';
export const addBlog = async (req, res) => {
    const { title, description, category } = req.body;
    const { image } = req.files;
    if (!title || !description || !image || !category) {
        return res.status(401).json({ success: false, messege: "All fields are required" })
    }
    if (title.length > 120) {
        return res.status(401).json({ success: false, messege: "maximum title is 120 characters" })
    }
    if (title.length < 12) {
        return res.status(401).json({ success: false, messege: "title contains 12 characters atleast" })
    }
    if (description.length < 256) {
        return res.status(401).json({ success: false, messege: "descrupition contains 256 characters atleast" })
    }
    const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedFormat.includes(image.mimetype)) {
        return res.status(400).json({ success: false, messege: "Invalid Format! Only jpg, jpeg, png, webp are allowed" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath)
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(cloudinaryResponse.error)
    }
    const imageUrl = cloudinaryResponse.url;
    const createdBy = req.user;
    const sql = 'INSERT INTO blogs(`title`,`description`,`image`,`category`,`created_By`) VALUES(?)';
    const values = [
        title,
        description,
        imageUrl,
        category,
        createdBy
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, messege: "Error in adding blog: " + err });
        } else {
            const sql = 'SELECT * FROM users WHERE _id = ?'
            db.query(sql, [createdBy], (err, data) => {
                if (err) {
                    return res.status(500).json({ success: false, messege: "Error adding blog: " + err });
                }
                res.status(201).json({ success: true, messege: "News added successfully", data })
            })
        }
    })
}

export const getAllBlogs = (req, res) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ success: false, messege: "Error in getting blogs: " + err })
        res.status(200).json(data)
    })
}

export const getUserOwnBlogs = (req, res) => {
    const user = req.user;
    const sql = "SELECT * FROM blogs WHERE created_By = ?"
    db.query(sql, [user], (err, data) => {
        if (err) return res.status(500).json({ success: false, messege: "Error in getting own blogs: " + err })
        res.status(200).json(data)
    })
}

export const deleteBlog = (req, res) => {
    const { blog_id } = req.params;
    const sql = 'DELETE FROM blogs WHERE _id = ?'
    db.query(sql, [blog_id], (err, result) => {
        if (err) return res.status(500).json({ success: false, messege: "Error in deleting blog: " + err })
        res.status(200).json({ success: true, messege: "News deleted Successfully" })
    })
}

export const getSingleBlog = (req, res) => {
    const { blog_id } = req.params;
    const sql = 'SELECT * FROM blogs JOIN users ON blogs.created_By = users._id WHERE blogs._id = ?';
    db.query(sql, [blog_id], (err, data) => {
        if (err) return res.status(500).json({ success: false, messege: "Error in getting single blog: " + err })
        res.status(200).json(data)
    })
}

export const getSearchBlogs = (req,res) => {
    const search = req.query.q;
    const sql = "SELECT * FROM blogs WHERE title LIKE ?";
    db.query(sql,[`%${search}%`], (err,data)=>{
        if(err) return res.status(500).json(err)
            res.json(data)
    })
}