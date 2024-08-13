import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, getLabels, updateBlog } from '../controllers/blog';
import upload from '../utils/ConfigMulter';

const router = Router()

router.get('/getBlogs', getBlogs)
router.get('/getBlog/:id', getBlog)
router.get("/getLabel/:label", getLabels)
router.post("/write_blog",upload.single('image'), createBlog)
router.patch("/update_blog/:id", updateBlog )
router.delete("/delete_blog/:id", deleteBlog )

export default router;