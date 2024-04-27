const express = require('express');
const router = express.Router();
const {register} = require('../controller/users.controller.js');
const {Login}  = require('../controller/users.controller.js')



router.get("/",(req,res) =>{
   res.send("this is auth endpont");
});


router.post("/register",register);
router.post("/login",Login);

module.exports = router;