import express from "express";
import {registerController,loginController,testController, forgotPasswordController} from "../controllers/authController.js";
import  {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post("/register",registerController);
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get('/test',requireSignIn,isAdmin,testController);

//user route 
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

export default router;