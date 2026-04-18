import { v2 as cloudinary } from 'cloudinary'
import db from '../config/db.js';

export const addBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const createdBy = req.user;

        if (!title || !description || !category || !req.files?.image) {
            return res.status(400).json({ success: false, messege: "All fields are required" });
        }

        if (title.length < 12 || title.length > 120) {
            return res.status(400).json({ success: false, messege: "Title must be 12–120 characters" });
        }

        if (description.length < 256) {
            return res.status(400).json({ success: false, messege: "Description must be at least 256 characters" });
        }

        const image = req.files.image;

        const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({ success: false, messege: "Invalid image format" });
        }

        const upload = await cloudinary.uploader.upload(image.tempFilePath);

        if (!upload || upload.error) {
            return res.status(500).json({ success: false, messege: "Image upload failed" });
        }

        const sql = `
      INSERT INTO blogs (title, description, image, category, created_By)
      VALUES (?, ?, ?, ?, ?)
    `;

        await db.query(sql, [
            title,
            description,
            upload.secure_url,
            category,
            createdBy
        ]);

        return res.status(201).json({
            success: true,
            messege: "Blog added successfully"
        });

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const [data] = await db.query(
            "SELECT _id, title, category, image, created_At FROM blogs"
        );

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const getCategoryBlogs = async (req, res) => {
    try {
        const { category } = req.params;

        const [data] = await db.query(
            "SELECT _id, title, category, image, created_At FROM blogs WHERE category = ?",
            [category]
        );

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const getUserOwnBlogs = async (req, res) => {
    try {
        const user = req.user;

        const [data] = await db.query(
            "SELECT _id, title, category, image, created_At FROM blogs WHERE created_By = ?",
            [user]
        );

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ success: false, messege: err.message });
    }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    await db.query("DELETE FROM blogs WHERE _id = ?", [blog_id]);

    return res.status(200).json({
      success: true,
      messege: "Blog deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({ success: false, messege: err.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const [data] = await db.query(
      `SELECT blogs.*, users.name, users.email, users.profile_image
       FROM blogs
       JOIN users ON blogs.created_By = users._id
       WHERE blogs._id = ?`,
      [blog_id]
    );

    if (!data.length) {
      return res.status(404).json({ success: false, messege: "Blog not found" });
    }

    return res.status(200).json(data[0]);

  } catch (err) {
    return res.status(500).json({ success: false, messege: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, messege: "All fields are required" });
    }

    if (title.length < 12 || title.length > 120) {
      return res.status(400).json({ success: false, messege: "Title must be 12–120 characters" });
    }

    if (description.length < 256) {
      return res.status(400).json({ success: false, messege: "Description must be at least 256 characters" });
    }

    let imageUrl = null;

    // ✅ If new image uploaded
    if (req.files && req.files.image) {
      const image = req.files.image;

      const allowedFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
      if (!allowedFormat.includes(image.mimetype)) {
        return res.status(400).json({ success: false, messege: "Invalid image format" });
      }

      const upload = await cloudinary.uploader.upload(image.tempFilePath);
      imageUrl = upload.secure_url;
    }

    let sql;
    let values;

    if (imageUrl) {
      sql = `UPDATE blogs SET title = ?, description = ?, category = ?, image = ? WHERE _id = ?`;
      values = [title, description, category, imageUrl, blogId];
    } else {
      sql = `UPDATE blogs SET title = ?, description = ?, category = ? WHERE _id = ?`;
      values = [title, description, category, blogId];
    }

    await db.query(sql, values);

    return res.status(200).json({
      success: true,
      messege: "Blog updated successfully"
    });

  } catch (err) {
    return res.status(500).json({ success: false, messege: err.message });
  }
};