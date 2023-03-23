import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken'


export const registerController=async(req,res)=>{

    try {
        const {name,email, password,phone,address,question}=req.body;
        if(!name){
            return res.send({error:`Name is require`})
        }
        if(!email){ 
            return res.send({error:`email is require`})
        }
        if(!password){
            return res.send({error:`password is require`})
        }
        if(!phone){
            return res.send({error:`phone is require`})
        }
        
        if(!address){
            return res.send({error:`address is require`})
        }
        if(!question){
            return res.send({error:`question is require`})
        }

        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
           return res.status(200).send({
                success :false ,
                message:`Already register Please login`,
               
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name,email,phone,password:hashedPassword,address,question}).save()
        res.status(201).send({
            success :true,
            message:`User registration success`,
            user
        })
            
    } catch (error) {
        res.status(500).send({
            success :false,
            message:`Error in the registration`,
            error:error
        })
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
           return res.status(404).send({
            success:false,
            message:`Invalid email or password`
           }) 
        }
        const user=await userModel.findOne({email})

        if(!user){
            return res.status(404).send({
                success:false,
                message:`user not found `
            })
        }
        const match=await comparePassword(password,user.password);
        
        if(!match){
            return res.status(200).send({
                success:false,
                message:`the password is incorrect`
            })
        }
        const token =await JWT.sign({_id:user._id},process.env.SECRET_KEY ,{expiresIn:"5d"}) ;
        res.status(200).send({
            success:true,
            message:`login successfully`,
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role
            },
            token,
        })
    } catch (error) {
        res.status(500).send({
            success :false,
            message:`Error in the login`,
            error:error
        })
    }
}

//forgotPasswordController

export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,question,newPassword}=req.body
        if(!email){ 
            return res.send({error:`email is require`})
        }
        if(!question){
            return res.send({error:`question is require`})
        }
        if(!newPassword){
            return res.send({error:`newPassword is require`})
        }
        const user=await userModel.findOne({email,question})
        if(!user){
            return res.status(404).send({
                success:false,
                message:`wrong email or question`
            })
        }
        const hashed=await hashPassword(newPassword);
              await userModel.findByIdAndUpdate(user._id,{password:hashed})
              res.status(200).send({
                success:true,
                message:`password reset successfully`
              })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success :false,
            message:`Something went wrong`,
            error:error
        })
    }
}

export const testController=(req,res)=>{
    res.send(`protection`)
}