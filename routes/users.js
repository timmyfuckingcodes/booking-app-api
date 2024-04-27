const express = require('express');
const router = express.Router();
//controllers
const {verifyToken,verifyUser,verifyAdmin} = require('../utils/verifyToken.js');
const {getUsers,getUser,createUsers,updateUser,deleteUser} = require('../controller/auth.controller.js');


/* router.get("/checkauthentication", verifyToken,(req,res,next)=>{
    res.send("hello user you are logged in");
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user you can delete your account ");
});
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin you can delete your account ");
}) */
router.get("/:id",verifyUser, getUser);
router.delete("/:id",verifyUser, deleteUser);
router.put("/:id",verifyUser,updateUser);
router.post("/", verifyUser, createUsers);
router.get("/",verifyAdmin , getUsers);

module.exports = router;