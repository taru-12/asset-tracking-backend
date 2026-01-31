require("dotenv").config()
const mongoose=require("mongoose")
module.exports=()=>{
    mongoose.connect(process.env.DB_URL).
      then(()=>{console.log("database connect")}).
      catch((err)=>{console.log(err)})
}