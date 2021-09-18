import  mongoose from "mongoose";


// userSchma
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 3 ,
        max : 30,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String , 
        required : true,
        min: 6 ,
        max : 50
    },
    profilePicture : {
        type : String,
        default : ""
    },
    coverPicture : {
        type : String,
        default : ""
    },
    followers : {
        type : Array,
        default : []
    },
    following : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    desc : {
        type : String,
        max : 50
    },
    city : {
        type : String,
        max : 50
    },
    from : {
        type : String,
        max : 50
    },
    relationship : {
        type : Number,
        enum : [1,2,3]
    }
} , {timestamps : true})




const User = mongoose.model("User", userSchema);

export default User;