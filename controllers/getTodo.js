//import the model
const Todo = require("../models/Todo");


//define route handler

exports.getTodo =async(req,res) =>{
    try{
         //fetch all the todo items from database
         const todos = await Todo.find({});

         //response
         res.status(200)
         .json({
            success:true,
            data:todos,
            message:"Entire Todo Data is fetched",
         })
    }
    catch(err){
       console.error(err);
       res.ststus(500)
       .json({
        success:false,
        error:err.message,
        message:'Server Error',
       })
    }
}

exports.getTodoById =async(req,res)=>{
    try {
       // extract todo items basis on  id
        const id = req.params.id; // used to extract the dynamic parameter (id) from the URL.
        const todo = await Todo.findById( {_id: id})

        //data forgiven id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                messge:"No Data Found within given data"
            })
        }
        // data for given id Found
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fetched`,
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
         success:false,
         error:err.message,
         message:'Server Error',
        })
    }
}