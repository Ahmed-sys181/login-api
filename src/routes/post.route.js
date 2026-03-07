import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.route("/create").post(createPost);
postRouter.route("/get").get(getPosts);

export default postRouter