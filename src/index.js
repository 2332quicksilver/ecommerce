import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
mongoose.set('strictQuery', false);
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from  './routes/productRoutes.js'
import cors from 'cors'
dotenv.config();

const app=express();
app.use(cors())
app.use(express.json())
app.use(morgan("combined"))

//! Database 
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}

db();

//! Routes 

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)

app.get('/',(req,res)=>{
    res.send({
        message:`Welcome to home page`
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})