import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, trim: true, min: 8, max: 15 },                   
    phone: { type: String, require: true, trim: true },
    address: { type: String, require: true },
    question: { type: String, require: true },
    role: { type: Number, default:0 },
},{timestamps:true})

export default mongoose.model('user',userSchema)