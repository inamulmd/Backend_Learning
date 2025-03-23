// npm init -y
//npm i express
// create file of server.js


//Server Instantiate
const express = require('express');
const app = express();

//used to parese req.body in express -> PUT or POST
// const bodyParser = require('body-parser'); //*updatte in  lates version

//specifically prase JSON data & add it to the request.Body object
// app.use(bodyParser.json());//*
app.use(express.json());

//activate the server on 3000port
app.listen(8000,() =>{
    console.log("Server STarted at port no.8000");  //node server.js
});


//Routes //response
app.get('/',(req,res)=> {
    res.send("hello Jee,Kaise ho Saree");
})

app.post('/api/cars', (req,response) => {
    const {name, brand} =req.body;
    console.log(name);
    console.log(brand);
    response.send("Car Submitted Succssfully.")
})

const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Connection Successful")})
.catch((error) =>{console.log("Received an error")})
