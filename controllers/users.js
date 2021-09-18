import User from "../models/user.js"
import bcrypt from "bcrypt";

export const getUser = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).send(err);
    }
}

export const updateUser =  async(req, res) =>{
    // user cannot update other user account 
    if(req.body.userId === req.params.id){ // same user

        if(req.body.password){
            // we need to hash the password
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password , salt);
            }catch(err){
               return res.status(500).send(err);
            }
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set : req.body} , {new : true});
            return res.status(200).json("Your Account has been updated");
        }catch(err){
            return res.status(500).send(err);
        }

    }else{
        res.status(403).send("You can't update other user account");
    }
}

export const deleteUser =  async(req, res) =>{
    // current user can't delete other user's account
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findByIdAndDelete(req.body.userId,{new : true});
            res.status(200).json("Your Account has been deleted!");
        }catch(err){
          return  res.status(500).send(err);
        }

    }else{
        return res.status(403).send("you can't delete other user's account");
    }
}

export const followUser =  async(req, res)=>{
    
    // req.body.userId -> current user
    // req.params.id -> user to follow
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
  
          // if currentUser is already present in followers array of user -> then he already following user
          if (!user.followers.includes(req.body.userId)) {
  
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { following : req.params.id } });
  
            res.status(200).send(`you are now following ${user.username}`);
          } else {
            res.status(403).send(`you are already following ${user.username}`);
          }
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(403).send("you cant follow yourself");
      }
}

export const unfollowUser = async(req, res)=>{
    
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);

          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { following : req.params.id } });
            res.status(200).json(`unfollowed ${user.username}`);
          } else {
            res.status(403).json(`you are not following ${user.username}`);
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you can't unfollow yourself");
      }  

}
