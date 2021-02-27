import { model, Model, Schema } from 'mongoose';
import { IBlog } from '../utils/types';

const blogSchema: Schema = new Schema({
    title: {type: String, required:true},
    text: {type:String, required:true},
    skills: {type:String, required:true, enum: ["programming", "blackjack", "basketball", "guitar", "dunk"]}
}, {timestamps:true})

const Blog: Model<IBlog> = model("Blog", blogSchema);
export default Blog;