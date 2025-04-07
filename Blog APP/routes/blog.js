const express = require("express");
const router = express.Router();

//import Controller
const {dummyLink} = require('../controllers/LikeController');  
const {createComment} = require("../controllers/CommentController");
const {createPost} = require("../controllers/PostController");



// Mapping Create 
router.get("/dummyroute",dummyLink);
router.post("/comments/create", createComment);
router.post("/post/create",createPost);

//export
module.exports = router;