"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = userAuth;
const JWT_SECRET = "somescret@1234";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
async function userAuth(req, res, next) {
    const token = req.headers.token;
    try {
        const userId = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (userId) {
            const user = await db_1.userModel.findOne({
                //@ts-ignore
                _id: userId.id
            });
            if (!user) {
                res.status(401).json({
                    message: "User not authorized"
                });
            }
            //@ts-ignore
            req.userId = userId.id;
            next();
        }
        else {
            res.status(401).json({
                message: "You are not logged in"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "something went wrong"
        });
    }
}
;
