const Rooms = require('../models/room.model.js');
const Hotel = require('../models/hotel.model.js')

const createRoom = async(req,res)=>{
    try {
  const {hotelId} = req.params;
const newRoom =  await Rooms.create(req.body);
try {
   await Hotel.findByIdAndUpdate(hotelId,{
    $push:{ rooms: newRoom._id},
});
} catch (error) {
    console.log(error);
    res.status(500).json("you cannot create rooms") ; 
};   
res.status(200).json(newRoom);
    } catch (error) {
        console.log(error);
     res.status(500).json("you cannot create rooms");   
    }
}

    //UPDATE
    const updateRoom = async(req,res)=>{
        try {
         const {id} = req.params;
        const room = await Rooms.findByIdAndUpdate(id,req.body);
        console.log(room);
        res.status(200).json(hotel);
      } catch (error) {
        res.status(500).json(error);
        
      }
    }
    //DELETE
const deleteRoom = async(req,res)=>{
      try {
        const {hotelId}= req.params;
        const{id} = req.params;
        const room = await Rooms.findByIdAndDelete(id);
        try {
         await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms: req.params.id}}); 
        } catch (error) {
          res.status(500).json(error);
        }
        res.status(200).json(room);
      } catch (error) {
        res.status(500).json(error);
       }
 }
 //read
 const readRoom =  async(req,res,next)=>{
  
    console.log('this is the second middleware');
    try {
     const room = await Rooms.find({});
     res.status(200).json(room); 
    } catch (error) {
      res.status(500).json(error);
    }
  };
    
module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    readRoom
}