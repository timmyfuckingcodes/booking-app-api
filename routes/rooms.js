const express = require('express');
const router = express.Router();
//controllers
const {verifyToken,verifyUser,verifyAdmin} = require('../utils/verifyToken.js');
const {createRoom,updateRoom,deleteRoom,readRoom} = require('../controller/room.controller.js');



router.delete("/:id",verifyAdmin, deleteRoom);
router.put("/:id",verifyAdmin,updateRoom);
router.post("/:hotelid", verifyAdmin, createRoom);
router.get("/",verifyAdmin , readRoom);

module.exports = router;