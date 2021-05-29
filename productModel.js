const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName:{
        type:String,
        required:false
    },
    createdBy:{
        type:String,
        required:false
    },
    createdOn:{
        type:Date,
        required:false
    },
    updatedBy:{
        type:String,
        required:false
    },
    updatedOn:{
        type:Date,
        required:false
    },
    isDeleted:{
        type:Boolean,
        required:false,
        default:false
    },
    deletedBy:{
        type:String,
        required:false
    },
    deletedOn:{
        type:Date,
        required:false
    }
}) ;
module.exports = mongoose.model('Product',productSchema);