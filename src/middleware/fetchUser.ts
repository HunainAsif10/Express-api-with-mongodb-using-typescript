import jwt from "jsonwebtoken"
import {Request,Response,NextFunction,RequestHandler} from"express"
import { JWT_SEC } from "../config"

interface customRequest extends Request{
    user:any
}

export const fetchUser=(req:customRequest,res:Response,next:NextFunction)=>{
     let token=req.header("auth-token")

     if(!token){
        return res.status(401).json("Please Authenticate Using a Valid Token")
     }

     const data=jwt.verify(token,JWT_SEC) as {user:any};
     req.user=data.user;
     next()
}

export const fetchAndAuthenticate=(req:customRequest,res:Response,next:NextFunction)=>{
    fetchUser(req,res,()=>{
           if((req.user.id ===req.params.id) || req.user.isAdmin){
            next();
           }
           else{
            return res.status(401).json("Authentication Error")
           }
    })
}

