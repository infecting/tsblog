import { model, Model, Schema } from 'mongoose';
import { IBlog } from '../utils/types';
import {__skills__} from '../utils/constants'

const blogSchema: Schema = new Schema({
    title: {type: String, required:true},
    text: {type:String, required:true},
    coverPicture: {type:String, required:true},
    skills: {type:String, required:true, enum: __skills__},
    views: {type: Number, default: 0}
}, {timestamps:true})

const Blog: Model<IBlog> = model("Blog", blogSchema);
export default Blog;