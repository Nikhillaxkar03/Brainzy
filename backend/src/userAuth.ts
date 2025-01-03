import { Request, Response, NextFunction } from "express";

const JWT_SECRET = "somescret@1234";

import jwt from "jsonwebtoken";

import { userModel } from "./db";


export async function userAuth(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers.token;
    try{
        const userId = jwt.verify(token as string, JWT_SECRET);
        if(userId) {
        const user = await userModel.findOne({
            //@ts-ignore
            _id: userId.id
        })
        if(!user) {
            res.status(401).json({
                message: "User not authorized"
            })
        }

           //@ts-ignore
           req.userId  = userId.id
           next();
    }
    else{
        res.status(401).json({
            message: "You are not logged in"
    })
    }
    
}catch(e) {
    res.status(500).json({
        message: "something went wrong"
    })
} };