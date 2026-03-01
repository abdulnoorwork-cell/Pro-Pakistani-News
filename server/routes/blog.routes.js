import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getSingleBlog, getUserOwnBlogs } from '../controllers/blog.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post('/add',isAuthenticated, addBlog);
router.get('/get-blogs',getAllBlogs);
router.get('/get-own-blogs',isAuthenticated, getUserOwnBlogs);
router.delete('/delete/:blog_id', deleteBlog);
router.get('/blog-detail/:blog_id', getSingleBlog);

export default router;