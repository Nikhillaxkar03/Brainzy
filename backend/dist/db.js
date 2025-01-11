"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = exports.linkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const contentType = ['youtube', 'twitter', 'article', 'image'];
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const ContentSchema = new mongoose_1.Schema({
    type: { type: String, enums: contentType, required: true },
    link: { type: String, ref: 'Link', required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
});
const LinkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: String, required: true }
});
const TagSchema = new mongoose_1.Schema({
    title: { type: String, required: true }
});
//Models
const userModel = (0, mongoose_1.model)('User', UserSchema);
exports.userModel = userModel;
const contentModel = (0, mongoose_1.model)('Content', ContentSchema);
exports.contentModel = contentModel;
const linkModel = (0, mongoose_1.model)('Link', LinkSchema);
exports.linkModel = linkModel;
const tagModel = (0, mongoose_1.model)('Tag', TagSchema);
exports.tagModel = tagModel;
