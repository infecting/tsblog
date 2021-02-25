import express, {Application} from 'express';
import * as env from 'dotenv'
import * as auth from './controllers/authentication'
import * as blogs from './controllers/blog';
import { connectDatabase } from './utils/functions';
env.config()
const app: Application = express();
const PORT: number = 5000 || process.env.PORT;

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
// Get Blog by ID
app.get("/api/v1/blogs/:id", blogs.getBlog)
// Create Blog
app.post("api/v1/blogs/create", blogs.createBlog);
// Delete Blog
app.delete("api/v1/blogs/delete/:id")


app.listen(PORT, () => {
    console.log(`App now listening on port ${PORT}`)
})