import {Request, Response} from 'express';
import Blog from '../models/Blog';
import { ok, throwError } from '../utils/functions';
import { IBlog } from '../utils/types';

export let getBlogs = async (req: Request, res: Response) => {
    try {
        const s: string = req.query.s as string
        const blogs: IBlog[] = await Blog.find({skills: s});
        ok(res, "blogs", blogs);
    } catch(e) {
        throwError(res, 500, "Server Error")
    }
}

export let getBlog = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const blog: IBlog |null = await Blog.findById(id);
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
        const newBlog: IBlog = await Blog.create({text: req.body.text, skills: req.body.skills})
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