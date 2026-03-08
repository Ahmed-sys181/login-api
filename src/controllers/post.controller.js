import { Post } from "../models/post.model.js";

const createPost = async (req , res) => { 
    try {
        const { name , description , age  } = req.body ;
        if (!name || !description || !age){ 
            return res.status(400).json({ message : "all fields are required" });
        }
        const post = await Post.create({
            name , description , age
        });
        res.status(201).json({ message : "post created" })
    } catch (error) {
        res.status(500).json({ message : "internal server error" })
    }
}

const getPosts = async (req , res) => { 
    try {
        const posts = await Post.find(); 
        res.status(200).json({ message : "success !",
            posts : posts
         })
    } catch(error) {
        res.status(500).json({ message : "internal server error !" })
    }
} ; 

const updatePost = async (req , res) => { 
    try {
        if ( Object.keys( req.body === 0 )){
            res.status(400).json({ message : "no data provided to update" })
        }
        const post = await Post.findByIdAndUpdate(
            req.params.id ,
            req.body ,
            { new : true }
        );
        if (!post){
            res.status(404).json({ message: "Post not found " })
        };

        res.status(200).json({ message : "post updated !" })
    } catch (error) {
        res.status(500).json({ message : "internal server error !" , error })
    }
}

const deletePost = async (req , res) => {
    try {
        const deleted = await Post.findByIdAndDelete( req.params.id );
        if (!deleted){
            res.status(400).json({ message : "post not found" })
        }
        res.status(200).json({ message : "Post deleted successfully !" })
    } catch (error) {
        res.status(500).json({ message : "internal server error !" });
    }
}

export { 
    createPost , 
    getPosts ,
    updatePost ,
    deletePost
}