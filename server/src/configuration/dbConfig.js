const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    serverSelectionTimeoutMS:5000
})
mongoose.connection.on('connected',()=>{
    console.log('connected to database');
    
});
mongoose.connection.on('error',(err)=>{
    console.log('Database error:' + err);
    
})
module.exports=mongoose;
