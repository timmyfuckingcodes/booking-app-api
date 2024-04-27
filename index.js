const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotels = require('./models/hotel.model.js');
//Route
const authRoute = require('./routes/auth.js');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/users.js');
const roomRoute =  require('./routes/rooms.js')

const {verifyToken,verifyUser,verifyAdmin} = require('./utils/verifyToken.js');



dotenv.config();
app.use(express.json());
app.use(cookieParser());





//Routes
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use('/api/room',roomRoute);


//CREATE
app.post("/" ,verifyAdmin, async(req,res)=>{
try {
  const hotel = await Hotels.create(req.body);
  res.status(200).json(hotel);
  console.log(error);
} catch (error) {
  res.status(500).json(error);
}
  
})
//READ
app.get("/", async(req,res,next)=>{
  
  console.log('this is the second middleware');
  try {
   const hotel = await Hotels.find({});
   res.status(200).json(hotel); 
  } catch (error) {
    res.status(500).json(error);
  }
})
//UPDATE
app.put("/:id", verifyAdmin,async(req,res)=>{
    try {
     const {id} = req.params;
    const hotel = await Hotels.findByIdAndUpdate(id,req.body);
    console.log(hotel);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
    
  }
})
//DELETE
app.delete("/:id",verifyAdmin, async(req,res)=>{
  try {
    const{id} = req.params;
    const hotel = await Hotels.findByIdAndDelete(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
   }
});

app.get("/countByCity" ,async(req,res)=>{
  const cities = req.query.cities.split(",")
try {
const list = await Promise.all(cities.map(city =>{
 return Hotels.countDocuments({city:city});
}))
  res.status(200).json(list);
} catch (error) {
  console.log(error);
  res.status(500).json(error);
}
})




mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected!');
    app.listen(8080,()=>{
    console.log("connected on port 8080");
});
}
)
.catch(()=> console.log('not connected'));