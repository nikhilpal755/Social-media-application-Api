import User from "../models/user.js";
import  bcrypt from "bcrypt";

export const registerUser = async(req, res) =>{

    try{

        //hashing of password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // creating a new user
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
        })

        // saving a user
        const doc = await user.save();
        console.log(doc);
        res.status(200).send("user is added");

    }catch(err){
        res.status(400).send(err);
    }


}

export const loginUser = async(req, res) =>{
    console.log(req.body);
    try{
        //checking if user is present in our database or not
       const user = await User.findOne({email : req.body.email});
       !user && res.status(404).json(`User with email:${req.body.email} is not present in database`);

       // now we need to compare the passwords - one that is stored in db , one that is entered
      const checkPassword = await bcrypt.compare(req.body.password , user.password);
      !checkPassword && res.status(400).json('Password is not matching');

      res.status(200).json(user);

    
    }catch(err){
        res.status(500).send(err);
    }
}
