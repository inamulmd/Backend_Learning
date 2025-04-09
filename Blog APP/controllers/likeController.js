
//impport models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like the post

exports.likePost = async (req,res) =>{
    try{
        const {post, user} = req.body;
        //create like object
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();

        //update the post collection by adding the like Id to the likes array 
         await Post.findByIdAndUpdate(post, {$push:{likes:savedLike._id}},{new:true});
                          
        //populate the likes array with Like documents
        const updatedPost = await Post.findById(post)
        .populate("likes")
         .exec();
        
        res.json({
            post:updatedPost,
        });
    }
    catch (error){
        return res.status(400).json({
            error:"Error while creating post",
        });
 }
};

//unlike a postt
exports.unlikePost =async (req, res)=> {
    try{
       const {post, like} = req.body;
       //find and delete the Like collection me se
       const deletedLike = await Like.findOneAndDelete({post:post,_id:like}) 

       //update the post colllection by removing the like ID from thr Likes array
       const updatedPost = await Post.findByIdAndUpdate(post,
                                                       {$pull: {likes:deletedLike._id} },
                                                       {new:true});

       //populate the likes array with like documents

       res.json({
        post:updatedPost,
       });
    } 
    catch (error){
        return res.ststus(400).json({
            error:"Error while Unliking post",
        });

    }
}


exports.dummyLink = async(req,res)=> {
    res.send("This is your dummy Page");
};