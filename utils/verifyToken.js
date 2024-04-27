const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
const token = req.cookies.access_token;
if(!token){
   return res.status(404).json("user not AUTHENTICATED"); 
}

jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err){
        return(404).json("token not valid")
    }
  next();
  req.user = user;

})
};

  const verifyUser = (req,res,next)=>{
 verifyToken(req,res,next, ()=>{
  if(req.user.id === req.params.id|| req.user.isAdmin){
    next();
  }else{
    if(err){
      res.status(403).json("You are not authorized");
    }
  }
 });
};

const verifyAdmin = (req,res,next)=>{
  verifyToken(req,res,next,()=>{
    if(req.user.isAdmin){
      next();
    }else{
      if(err){
        res.status(403).json("You are not authorized");
      }
    }
  })
}


module.exports = {
  verifyToken,
 verifyUser,
 verifyAdmin
};

