import mongoose from 'mongoose';
import {Response} from 'express';
import {IUser} from './types'
import * as env from 'dotenv'
env.config()

export var ok = async (res: Response, name:string, data:any) => {               
    res.json({                                                                  
        success: true,                                                          
        data: {                                                                 
            [name]: data                                                        
        }                                                                       
    })                                                                          
}  

export var auth = async (res: Response, token:string, user:IUser) => {               
    res.json({                                                                  
        success: true,                                                          
        data: {                                                                 
            accessToken: `Bearer ${token}`,
            user: user                                                       
        }                                                                       
    })                                                                          
}  

export var throwError = async (res: Response, code: number, e: any) => {
    res.status(code).json({
        success: false,
        error: {
            reason: e.msg
        }
    })
}


export var connectDatabase = async () => {                                      
    let uri:string = process.env.MONGO_URI!
    try {                                                                       
        await mongoose.connect(uri,
            {
              user: "admin",
              pass: process.env.PASSWORD,
              "useNewUrlParser": true,
              "useCreateIndex": true,
              "useUnifiedTopology": true
            })
        console.log("Database connection established")                          
    } catch (e) {                                                               
        console.log(e)                                                          
    }                                                                           
}   