"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth_1 = require("./userAuth");
const zod_1 = require("zod");
const db_1 = require("./db");
const util_js_1 = require("./util.js");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "somescret@1234";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const main = async () => {
    await mongoose_1.default.connect("mongodb+srv://nikhilkadata:nikhil_2003@cluster0.f7tbs0z.mongodb.net/Brainzy");
};
main().catch(err => {
    console.log(err);
});

app.get('/', (req, res)=> {
    res.send("Hello world");
})

app.post('/api/v1/signin', async (req, res) => {
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const mySchema = zod_1.z.object({
        username: zod_1.z.string().min(3, { message: "Username must have 3 characters or more" }),
        password: zod_1.z.string().min(8, { message: "Password must have atleast 8 characters" }).
            max(20, { message: "Cannot exceed more than 20 characters" })
            .regex(specialCharRegex, { message: "Password must include at least one special character" })
    });
    const { success, error, data } = mySchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: error.issues[0].message
        });
    }
    else {
        const hashedPass = await bcrypt_1.default.hash(data.password, 10);
        try {
            await db_1.userModel.create({
                username: data.username,
                password: hashedPass
            });
            res.status(200).json({
                message: "User Updated"
            });
        }
        catch (e) {
            if (e.code === 11000) {
                res.status(409).json({
                    message: "Username is already taken"
                });
            }
        }
    }
});
app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db_1.userModel.findOne({
            username: username
        });
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
        }
        else {
            const result = await bcrypt_1.default.compare(password, user.password);
            if (result) {
                const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
                if (token) {
                    res.status(200).json({
                        token: token
                    });
                }
                else {
                    res.status(500).json({
                        message: "server failed"
                    });
                }
            }
            else {
                res.status(403).json({
                    message: "Invalid Password"
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Server crashed"
        });
    }
});
app.post('/api/v1/add-content', userAuth_1.userAuth, async (req, res) => {
    const { title, type, link } = req.body;
    try {
        await db_1.contentModel.create({
            title,
            type,
            link,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        res.status(200).json({
            message: "Content added successfully"
        });
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/api/v1/content', userAuth_1.userAuth, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    try {
        const data = await db_1.contentModel.find({
            userId: userId
        }).populate('userId', 'username');
        if (data && data.length !== 0) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({
                message: "Data is not available"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Server crashed"
        });
    }
});
app.delete('/api/v1/delete-content', userAuth_1.userAuth, async (req, res) => {
    const contentId = req.headers.contentid;
    try {
        await db_1.contentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        res.status(200).json({
            message: "Content Deleted"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "Cannot delete the content"
        });
    }
});
app.post('/api/v1/share', userAuth_1.userAuth, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const hash = (0, util_js_1.random)(12);
        try {
            const user = await db_1.linkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (user) {
                res.status(200).json({
                    link: "share/" + user.hash
                });
            }
            else {
                await db_1.linkModel.create({
                    hash: hash,
                    //@ts-ignore
                    userId: req.userId
                });
                res.status(200).json({
                    link: "share/" + hash
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "System crashed"
            });
        }
    }
    else {
        try {
            await db_1.linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.status(200).json({
                message: 'link removed'
            });
        }
        catch (e) {
            res.status(500).json({
                message: "server not responding"
            });
        }
    }
});
app.get('/api/v1/share/:link', async (req, res) => {
    const hash = req.params.link;
    try {
        const data = await db_1.linkModel.findOne({
            hash: hash
        });
        if (!data) {
            res.status(410).json({
                message: "Data is not available for this link"
            });
        }
        else {
            const content = await db_1.contentModel.find({
                userId: data.userId
            });
            const user = await db_1.userModel.findOne({
                _id: data.userId
            });
            if (user) {
                res.status(200).json({
                    user: user.username,
                    content: content
                });
            }
            else {
                res.status(404).json({
                    message: "content not found"
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            message: "server not responding"
        });
    }
});


app.listen(process.env.PORT || 3000 , () => {
    console.log("sever running at port 3000");
});
