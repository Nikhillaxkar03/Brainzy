import express, {Request, Response} from 'express';

import mongoose, { MongooseError } from 'mongoose';

import bycrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { userAuth } from './userAuth';

import {z} from 'zod';

import { contentModel, linkModel, userModel } from './db';

import { random } from './util.js';

import cors from 'cors'

const JWT_SECRET = "somescret@1234";

const app = express();

app.use(cors())

app.use(express.json());

const main = async () =>  {
    await mongoose.connect("mongodb+srv://nikhilkadata:nikhil_2003@cluster0.f7tbs0z.mongodb.net/Brainzy");
}

main().catch(err => {
    console.log(err);
})

app.post('/api/v1/signin', async (req: Request, res : Response)=> {

    const specialCharRegex = /[^a-zA-Z0-9]/;

    const mySchema = z.object({
        username: z.string().min(3, {message: "Username must have 3 characters or more"}),
        password: z.string().min(8, {message: "Password must have atleast 8 characters"}).
        max(20, {message: "Cannot exceed more than 20 characters"})
        .regex(specialCharRegex, { message: "Password must include at least one special character" })
    });

    const {success, error, data} = mySchema.safeParse(req.body);

    if(!success) {
        res.status(411).json({
            message: error.issues[0].message
        })
    }
    else{
        const hashedPass = await bycrypt.hash(data.password, 10);
        try{
            await userModel.create({
                username: data.username,
                password: hashedPass
            });

            res.status(200).json({
                message: "User Updated"
            })
        }
        catch(e: any) {
            if(e.code === 11000) {
                res.status(409).json({
                    message: "Username is already taken"
                })
            }
        }
        
    }
})

app.post('/api/v1/login', async (req: Request, res: Response)=> {

    const {username, password} = req.body;

    try{
        const user = await userModel.findOne({
            username: username
        });

        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else{
            const result = await bycrypt.compare(password, user.password);

            if(result) {
                const token = jwt.sign({id: user._id}, JWT_SECRET);
                if(token) {
                    res.status(200).json({
                        token: token
                    })
                }
                else{
                    res.status(500).json({
                        message: "server failed"
                    })
                }
            }
            else {
                res.status(403).json({
                    message: "Invalid Password"
                })
            }   
        }
    }catch(e) {
        res.status(500).json({
            message: "Server crashed"
        })
    }   
})

app.post('/api/v1/add-content', userAuth, async (req, res)=> {
    const {title, type, link} = req.body;
    try{
        await contentModel.create({
            title,
            type,
            link,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })
        res.status(200).json({
            message: "Content added successfully"
        })
    }
    catch(e: any){
        if(e.code === 11000) {
            res.status(409).json({
                message: "following link is already exist"
            })
        }
        else{
            res.status(500).json({
                message: "Server Error"
            })
        }
    }
})

app.get('/api/v1/content', userAuth, async (req, res)=> {
    //@ts-ignore
    const userId = req.userId;
    try{
        const data = await contentModel.find({
            userId: userId
        }).populate('userId', 'username');
        if(data && data.length !== 0) {
            res.status(200).json(data);
        }
        else{
            res.status(404).json({
                message: "Data is not available"
            })
        }
    }catch(e) {
        res.status(500).json({
            message: "Server crashed"
        })
    }
})

app.delete('/api/v1/delete-content', userAuth , async (req, res)=> {
    const contentId = req.headers.contentid;

    try{
       await contentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        })

        res.status(200).json({
            message: "Content Deleted"
        })
    }
    catch(e){
        res.status(403).json({
            message: "Cannot delete the content"
        })
    }
})


app.post('/api/v1/share', userAuth, async (req, res)=> {
    const share = req.body.share;
    if(share) {
        const hash = random(12);
        try{
            const user = await linkModel.findOne({
                //@ts-ignore
                userId: req.userId
            })
            
            if(user) {
                res.status(200).json({
                    link: user.hash
                })
            }
            else{
            await linkModel.create({
                hash: hash,
                //@ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                link: hash
            })
        }
        }
        catch(e) {
            res.status(500).json({
                message: "System crashed"
            })
        }
    }
    else{
        try{
            await linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                message: 'link removed'
            })
        }

        catch(e) {
            res.status(500).json({ 
                message: "server not responding"
            })
        }
    }
})

app.get('/api/v1/share/:link', async (req, res)=> {
    const hash = req.params.link;

    try{
        const data = await linkModel.findOne({
            hash: hash
        })

        if(!data) {
            res.status(410).json({
                message: "Data is not available for this link"
            })
        }
        else{
            const content = await contentModel.find({
                userId: data.userId
            })
            const user = await userModel.findOne({
                _id: data.userId
            })

            if(user) {
                res.status(200).json( {
                    user: user.username ,
                    content: content
                }
            )
            }
            else{
                res.status(404).json( {
                    message: "content not found"
                })
            }
        }
    }
    catch(e) {
        res.status(500).json({
            message: "server not responding"
        })
    }
})

app.listen(3000, ()=> {
    console.log("sever running at port 3000");
})