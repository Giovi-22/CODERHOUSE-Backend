import mongoose from "mongoose";

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    "title": {type:String,require:true},
    "description": {type:String,require:true},
    "price": {type:Number,require:true},
    "thumbnail": {type:Array,require:true},
    "stock": {type:Number,require:true},
    "code": {type:String,require:true},  
    "status": {type:Boolean,require:true},
    "category": {type:String,require:true}
})

export const productModel = mongoose.model(productsCollection,productSchema);