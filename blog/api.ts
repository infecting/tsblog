import axios from 'axios';

async function sendApiRequest<T>(method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", path: string, withCredentials:boolean, data?: any, headers?: any): Promise<T> {
    path = `${process.env.NEXT_PUBLIC_URI}api/v1/${path}`;
    const response = await axios.request({method, baseURL: path, data, withCredentials:withCredentials, headers: headers});
    const success: boolean = response.data.success;
    if (success) {
        return response.data.data as T;
    } else {
        console.log(response.data)
        if (response.data.error) {
            throw new Error(response.data.error);
        } else {
            throw new Error(`Received error code from server: ${response.status}`);
        }
    }
}
// typescript api function from rmmcrystal on github with a few modifications.

export async function getUsers(): Promise<IUser> {
    return await sendApiRequest("GET", "users", false);
}

export async function register(username: string, password: string): Promise<IUser> {
    return await sendApiRequest("POST", "users/register", false, {username: username, password: password})
}

export async function login(username: string, password: string): Promise<IAuth> {
    return await sendApiRequest("POST", "users/login", true, {username: username, password: password})
}

export async function refreshToken(): Promise<IAuth> {
    return await sendApiRequest("POST", "users/refresh_token", true);
}

export async function getBlogs(): Promise<{blogs: IBlog[]}> {
    return await sendApiRequest("GET", "blogs", false)
}

export async function getSkillsBlogs(skills:string): Promise<{blogs: IBlog[]}> {
    return await sendApiRequest("GET", `blogs?s=${skills}`, false)
}

export async function getRecentBlogs(): Promise<{blogs: IBlog[]}> {
    return await sendApiRequest("GET", "blogs/recent", false)
}

export async function createBlog(token: string, title: string, text: string, skills: string, coverPicture: string): Promise<{newBlog: IBlog}> {
    return await sendApiRequest("POST", "blogs/create", false, {title: title, text: text, skills: skills, coverPicture: coverPicture}, {"Authorization": token})
}

export async function getBlog(id: string[] | string): Promise<{blogs: IBlog}> {
    return await sendApiRequest("GET", `blogs/${id}`, false)
}

export interface IAuth {
    accessToken: string;
    user: IUser;
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
}

export interface IBlog {
    _id: string;
    title: string;
    text: string;
    skills: string;
    coverPicture: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}