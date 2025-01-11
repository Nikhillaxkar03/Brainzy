import mongoose, {Schema, model} from "mongoose";

const contentType = ['youtube', 'twitter', 'article', 'image'];

const UserSchema = new Schema( {
    username: {type: String, required: true , unique: true},
    password: {type: String, required: true}
})

const ContentSchema = new Schema({
    type: {type: String, enums: contentType, required: true},
    link: {type: String, ref: 'Link', required: true},
    title: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const LinkSchema = new Schema({
    hash: {type: String, required: true, unique: true},
    userId: {type: String, required: true}
})

const TagSchema = new Schema({
    title: {type: String, required: true }
})


//Models

const userModel = model('User', UserSchema);

const contentModel = model('Content', ContentSchema);

const linkModel = model('Link', LinkSchema);

const tagModel = model('Tag', TagSchema);


export {userModel, contentModel, linkModel, tagModel};