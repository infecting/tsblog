import {Request, Response} from 'express';
import Blog from '../models/Blog';
import { ok, throwError } from '../utils/functions';
import { IBlog } from '../utils/types';

export let getBlogs = async (req: Request, res: Response) => {
    try {
        const s: string = req.query.s as string
        if (!s) {
            const blogs: IBlog[] = await Blog.find()
            ok(res, "blogs", blogs);
        } else {
            const blogs: IBlog[] = await Blog.find({skills: s});
            ok(res, "blogs", blogs);
        }
    } catch(e) {
        throwError(res, 500, "Server Error")
    }
}

export let recentBlogs = async(req:Request, res:Response) => {
    try {
        const blogs: IBlog[] = await Blog.find({}, {}, {sort: {"createdAt": -1}}).limit(3)
        ok(res, "blogs", blogs);
    } catch(e) {
        throwError(res, 500, "Server Error")
    }
}

export let getBlog = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const blog: IBlog |null = await Blog.findById(id);
        await Blog.findByIdAndUpdate(id, {$inc: {"views": 1}}, {new:true})
        if (!blog) {
            throw new Error("No blog found by this id")
        }
        ok(res, "blogs", blog)
    } catch(e) {
        throwError(res, 500, e)
    }
}

export let createBlog = async(req: Request, res: Response) => {
    try {
        const newBlog: IBlog = await Blog.create({title: req.body.title, text: req.body.text, skills: req.body.skills, coverPicture: req.body.coverPicture})
        ok(res, "newBlog", newBlog);
    } catch(e) {
        throwError(res, 500, "Server Error")
    }
}

export let deleteBlog = async(req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            throw new Error("Blog with that id not found")
        }
        ok(res, "deletedBlog", deletedBlog)
    } catch(e) {
        throwError(res, 500, e)
    }
}