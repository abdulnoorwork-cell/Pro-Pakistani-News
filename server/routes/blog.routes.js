import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getSearchBlogs, getSingleBlog, getUserOwnBlogs } from '../controllers/blog.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post('/add',isAuthenticated, addBlog);
router.get('/get-blogs',getAllBlogs);
router.get('/get-own-blogs',isAuthenticated, getUserOwnBlogs);
router.delete('/delete/:blog_id', deleteBlog);
router.get('/blog-detail/:blog_id', getSingleBlog);
router.get('/search-blogs', getSearchBlogs);

export default router;