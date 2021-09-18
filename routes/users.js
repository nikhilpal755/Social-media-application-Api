import express from "express";

import {getUser , updateUser , deleteUser, followUser, unfollowUser} from "../controllers/users.js"

const router = express.Router();

// get user by id
router.get("/:id" , getUser);

// update user by id
router.put("/:id" ,updateUser);

// delete user by id
router.delete("/:id",deleteUser);

// follow user
router.put("/:id/follow",followUser);
  
// unfollow user
router.put("/:id/unfollow" , unfollowUser);


export default router; 