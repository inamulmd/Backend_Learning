const Post = require("../models/postModel");

exports.createPost = async (req,res)=> {
    try {
          const {title, body} = req.body;
          //create a post object
          const post = new Post ({
            title,body,
          });
          const savePost = await post.save();

          res.json({
            post:savePost,
          });
    }
    catch(error) {
          return res.status(400).json({
            error:"Error while creating post",
          })
    }
}