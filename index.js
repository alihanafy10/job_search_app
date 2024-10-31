//handle errors in code
process.on('uncaughtException', (error) => {
    console.log('error in code',error)
})

import express from 'express';
import { config } from 'dotenv';
import path from 'path';

import { AppEroor } from './src/utils/appError.js';

import {dbConnection}from './DataBase/connection.js';

import userRouter from './src/modules/User/User.routes.js';
import companyRouter from './src/modules/company/company.routes.js';
import jobRouter from './src/modules/job/job.routes.js';
import applicationRouter from './src/modules/application/application.routes.js';



if(process.env.NODE_ENV=='dev'){
    config({path:path.resolve('./dev.env')})
}
if(process.env.NODE_ENV=='prod'){
    config({path:path.resolve('./prod.env')})
}
config();

const app = express();
const port=process.env.PORT 

dbConnection(process.env.DB_CONNECTION)
app.use(express.json());

app.use('/user',userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter )
app.use('/application',applicationRouter)

// handeling unhandled routes
app.use('*', (req, res, next) => {
    next(new AppEroor(`route not found ${req.originalUrl}`,404))
})

 //error handler
app.use((err, req, res, next) => {
    let code=err.statusCode || 500
    if(process.env.NODE_ENV=='dev'){
        res.status(code).json({error:"error",message:err.message,code,errorDetails:err.errorDetails,stack:err.stack})
    }
    if(process.env.NODE_ENV=='prod'){
        res.status(code).json({error:"error",message:err.message,code,errorDetails:err.errorDetails})
    }
   
 })

// handle error outside express
process.on('unhandledRejection', (error) => {
    console.log('error',error);
})

app.listen(port,()=>{
    console.log(`server is runing at port ${port}`)
})