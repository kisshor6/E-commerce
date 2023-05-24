const mongoose = require('mongoose');
const {Schema} = mongoose

const ProductSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    price : {
        type : String,
        require: true
    },
    category :{
        type : String,
        require : true
    },
    userId :{
        type : String,
        require : true
    },
    company :{
        type : String,
        require : true
    }
});
const Product = mongoose.model("products", ProductSchema);
module.exports = Product