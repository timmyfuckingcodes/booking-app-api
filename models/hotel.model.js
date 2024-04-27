const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
},
{
    timestamps:true
}
)

const Hotels = mongoose.model('Hotel',HotelSchema);
module.exports = Hotels;