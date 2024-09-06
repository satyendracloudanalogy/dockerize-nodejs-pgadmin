import { Router } from "express";
import { deletePost,updatePost,createPost,getAllPosts } from "../../controllers/post/postController";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
