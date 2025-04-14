const express = require("express");
const router = express.Router();

const {login,signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/Auth");

router.post("/login",login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test", auth,  (req, res) => {
    res.json({
         success:true,
         message:"Welcome to the protected routes for TEST,"
    });
});
//Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
         success:true,
         message:"Welcome to the protected routes for Students,"
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
         success:true,
         message:"Welcome to the protected routes for Admin,"
    });
});


module.exports = router;