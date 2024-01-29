import express from 'express';
import ejsLayouts from 'express-ejs-layouts'
import path from 'path';
import JobController from './src/controller/job.controller.js';
import UserController from './src/controller/userController.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middlewares.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { uploadFilemultiple } from './src/middlewares/uploadFilemultiple.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import flash from 'express-flash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 5000;
const server = express();
//setup a session key
server.use(
    session({
        secret: 'ABHISHEKPRAJAPAT',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false}
    })
);

server.use(flash());

server.use(express.static('public'));
//setup view engine setting
server.set("view engine","ejs")
server.set("views", path.join(path.resolve(),'src','view'))
server.use('/view-resume/public', express.static(path.join(__dirname, 'public')));

//parse form data
server.use(express.urlencoded({extended: true}));

//use layouts
server.use(ejsLayouts)

//create an instance of controller
const jobcontroller = new JobController();
const userController = new UserController();
//setup all the routes
server.get("/", jobcontroller.home);
server.get("/jobs",jobcontroller.getjobs)
server.get("/ViewDetails/:id",auth,jobcontroller.viewjobdetail)
//setup routes for user controller

// registration route handler in index.js
server.post("/register", userController.postRegister);
server.post("/login",userController.postLogin)
server.get("/logout",auth,userController.logout)


//curd opertaion on Job
server.get("/getform", jobcontroller.getform)
server.post("/postjob",uploadFile.single('imageUrl'), jobcontroller.postjob)

//uploadFilemultiple.array('files')

server.get("/update-job/:id", auth, jobcontroller.getupdatejobview)
server.post("/delete-job/:id",auth,jobcontroller.deletejob)


//Setup a Server
server.listen(port,()=>{
    console.log(`server is Working on http://localhost:${port}`);
})