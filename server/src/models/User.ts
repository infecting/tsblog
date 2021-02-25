import { model, Model, Schema } from 'mongoose';
import { IUser } from '../utils/types';

const userSchema: Schema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true}
}, {timestamps:true})

const User: Model<IUser> = model("User", userSchema);
export default User;