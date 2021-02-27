import {Document, ObjectId} from 'mongoose';

export interface IUser extends Document {
    _id: ObjectId;
    username: string;
    password: string;
}

export interface IBlog extends Document {
    _id: ObjectId;
    title: string;
    text: string;
    skills: string;
}