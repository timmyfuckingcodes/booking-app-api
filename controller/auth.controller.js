const user = require('../models/auth.model.js');


const updateUser = async(req,res)=>{
    try {
     const {id} = req.params;
    const users = await user.findByIdAndUpdate(id,req.body);
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
    
  }
};

const deleteUser = async(req,res)=>{
    try {
      const{id} = req.params;
      const users = await user.findByIdAndDelete(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
     }
  };
  
const getUser = async(req,res)=>{
    try {
      const{id} = req.params;
      const users = await user.findById(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
     }
  };

  const getUsers = async(req,res,next)=>{
  
    console.log('this is the second middleware');
    try {
     const users = await user.find({});
     res.status(200).json(users); 
    } catch (error) {
      res.status(500).json(error);
    }
  };


  const createUsers = async(req,res)=>{
    try {
      const users = await user.create(req.body);
      res.status(200).json(users);
      console.log(error);
    } catch (error) {
      res.status(500).json(error);
    }
      
    };


module.exports = {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser 
};
