import axios from 'axios';

async function sendApiRequest<T>(method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", path: string, withCredentials:boolean, data?: any, headers?: any): Promise<T> {
        path = `${process.env.NEXT_PUBLIC_URI}/api/v1/${path}`;
        const response = await axios.request({method, baseURL: path, data, withCredentials:withCredentials, headers: headers});
        const success: boolean = response.data.success;
    if (success) {
        return response.data.data as T;
    } else {
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

export async function register(email: string, username: string, password: string): Promise<IUser> {
    return await sendApiRequest("POST", "users/register", false, {username: username, email: email, password: password, profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"})
}

export async function login(email: string, password: string): Promise<IAuth> {
    return await sendApiRequest("POST", "users/login", true, {email: email, password: password})
}

export async function refreshToken(): Promise<IAuth> {
    return await sendApiRequest("POST", "users/refresh_token", true);
}

export async function getBlogs(): Promise<IBlog> {
    return await sendApiRequest("GET", "blogs", false)
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
    text: string;
    skill: "programming" | "guitar" | "skateboarding" | "blackjack" | "dunk";
    createdAt: string;
    updatedAt: string;
}