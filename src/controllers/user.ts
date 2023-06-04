import {Request,Response,NextFunction,RequestHandler} from "express"
import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SEC } from "../config";
import {body,validationResult} from "express-validator"


// <---------------createUser------------->
export const createUser:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await body("name","Name Must be atleast 3 Characters").isLength({min:3}).run(req)
        await body("email","Please Enter A  Valid Email").isEmail().run(req)
        await body("password","Password Must be atLeast 5 Characters").isLength({min:5}).run(req)
       
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let user=await User.findOne({email:req.body.email})
        if(user){
       return res.status(401).json("User With This Email Already Exists");
        }
        
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(req.body.password,salt)

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })

        const data={
            user:{
                id:user.id
            }
        }
        const token= jwt.sign(data,JWT_SEC)
        res.status(200).json({token})

    } catch (error) {
        next(error)
        
    }
}

// <-------------------loginUser-------------->


export const loginUser:RequestHandler =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body;
        let user=await User.findOne({email})
        if(!user){
            return res.status(401).json("Please Authenticate using Correct Credentials")
        }
        let passwordCompare=await bcrypt.compare(password,user.password.toString())
        if(!passwordCompare){
         return res.status(401).json("Please authenticate using correct credentials")
        }
        const data={
            user:{
                id:user.id
            }
        }

        const token=jwt.sign(data,JWT_SEC)
        res.status(200).json({token})


    }catch (error) {
        next(error)
        
    }
}

// <----------------------updateUser---------------->



export const updateUser:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            const hash=await bcrypt.hash(req.body.password,salt)
            req.body.password=hash;
        }
        let user=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({user})
    } catch (error) {
        next(error)
        
    }
}



// <---------------deleteUser--------------->

export const deleteUser:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let deleteUser=await User.findByIdAndDelete(req.params.id)
        return res.status(200).json(deleteUser)
    } catch (error) {
        next(error)
        
    }
}
