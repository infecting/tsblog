import express, {Application} from 'express';
import * as env from 'dotenv'
import * as auth from './controllers/authentication'
import * as blogs from './controllers/blog';
import { connectDatabase } from './utils/functions';
import cors from 'cors'
import { __prod__ } from './utils/constants';
import cookieParser from 'cookie-parser';
env.config()

const app: Application = express();
const PORT: number = 5000 || process.env.PORT;
__prod__ ? app.set("proxy", 1): null
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        maxAge: 86400,
        credentials: true,
        origin: __prod__ ? "https://dword.dev": "http://localhost:3000"
    })
);


// Connect to database using function in utils
connectDatabase();

// Authentication routes

// Get all users
app.get("/api/v1/users", auth.getUsers)
// Register user 
app.post("/api/v1/users/register", auth.register)
// Login user
app.post("/api/v1/users/login", auth.login)
// Refresh User token
app.post("/api/v1/users/refresh_token", auth.refreshToken)

// Blog Routes

// Get Blog with optional skill parameter
app.get("/api/v1/blogs", blogs.getBlogs);
// Get Recent Blogs
app.get("/api/v1/blogs/recent", blogs.recentBlogs)
// Get Blog by ID
app.get("/api/v1/blogs/:id", blogs.getBlog)
// Create Blog
app.post("/api/v1/blogs/create", blogs.createBlog);
// Delete Blog
app.delete("/api/v1/blogs/delete/:id", blogs.deleteBlog)


app.listen(PORT, () => {
    console.log(`App now listening on port ${PORT}`)
})