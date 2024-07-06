import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blog';



const router = Router()

router.get('getBlogs', getBlogs)
router.get('blog/:id', getBlog)
router.post("write_blog", createBlog)
router.patch("update_blog/:id", updateBlog )
router.delete("delete_blog/:id", deleteBlog )

export default router