import express from "express";
const router = express.Router();

import {createPost, getPost, updatePost, deletePost, likePost, timelinePost} from "../controllers/posts.js";

//create a post
router.post("/",createPost);

//get a post
router.get("/:id", getPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like / dislike a post
router.put("/:id/like", likePost);

//get timeline posts
router.get("/timeline/all",timelinePost);

export default router; 