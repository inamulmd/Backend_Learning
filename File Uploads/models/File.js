const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    fileUrl:{
        type:String,
    },
    tags:{
        type:String
  },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save",async function(doc){ // installed nodemailer
  try{
      console.log("DOC",doc);

      //create transporter
      let transporter = nodemailer.createTransport ({
        host : process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        },
      });

      //send mail
      let info = await transporter.sendMail({
        from: `Infinity -by Inamul`,
        to: doc.email,
        subject: "New File Uploadd on Cloudinary",
        html:`<h2>hello bro</h2> <p> File Uploaded  View here:<a href="${doc.fileUrl}">${doc.fileUrl}</a></p>`
      })

      console.log("message sent:", info);
  }
  catch(error) {
      console.error("error in post middleware:",error);
  }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;