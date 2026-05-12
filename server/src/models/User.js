const mongoose =require('../configuration/dbConfig');
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    //emun:enum ka metlab ha ky sirf admin aur customer hi role ho sakta hai koi or value nhi

    //  defualt ka matlab: Agar user ne role specify nahi kiya to automatically 'user' set ho jayega.
    role:{type:String,enum:['admin','customer'],default:'customer'}
})

/// Ye line database mein 'users' collection banayegi aur usme userSchema ke according documents store karegi.
module.exports=mongoose.model('User',userSchema);