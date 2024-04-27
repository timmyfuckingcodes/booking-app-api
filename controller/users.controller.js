const auth = require('../models/auth.model.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const register = async(req,res)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
       const authentication = await auth.create({
            username: req.body.username, 
            email: req.body.email,
            password: hash
     }) 
     res.status(200).json(authentication);
    } catch (error) {
     res.status(500).json(error)   
    }
};

const Login = async(req,res)=>{
 try{
    const user = await auth.findOne({username : req.body.username});
    if(!user){
        res.status(404).json('User not found');
    }
    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password ); // true
    if (!isPasswordCorrect) {
        res.status(404).json('Wrong password');
    }


    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT);
    res.cookie("access_token", token,{
      httpOnly:true,  
    }).status(200).json(user);
    } catch (error) {
     res.status(500).json(error);
     console.log(error);   
    }
}
module.exports = {
    register,
    Login
};
 