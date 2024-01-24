import path from 'path';
import Photographer from '../model/jobs.model.js';
import UserModel from '../model/user.model.js';


export default class JobController{
    home(req, res){
        let user = UserModel.get();
        res.render('home',{errorMessage:null,userEmail: req.session.userEmail})
    }
    getjobs(req,res){
        let jobs = Photographer.get()
        res.render('jobs',{jobs:jobs,errorMessage:null,userEmail: req.session.userEmail})
    }
    viewjobdetail(req,res){
        let id = req.params.id;
        const job = Photographer.getById(id);
        res.render('job-detail', { job: job, errorMessage: null,userEmail: req.session.userEmail });
    }
    getform(req,res,next){
       return res.render('newjob',{userEmail: req.session.userEmail}); 
    }
    postjob(req,res,next){
        const {name, description, contact, gmail, linkdin } = req.body;
        const imageUrl = 'Photo/'+ req.file.filename;
        Photographer.addjob(name, description, contact, gmail, linkdin,imageUrl);
        let jobs = Photographer.get()
        res.render('jobs',{jobs:jobs,errorMessage:null,userEmail: req.session.userEmail})
    }

    getupdatejobview(req,res,next){
        const id = req.params.id;
        const jobfound = Photographer.getById(id);
        if(jobfound){
            res.render('update-job',{job:jobfound, errorMessage:null,userEmail: req.session.userEmail});
        }
        else{
            res.status(401).send('Job not found');
        }
    }

    deletejob(req,res,next){
        const id = req.params.id;
        const jobfound = Photographer.getById(id);
        if(! jobfound){
            return res.status(401).send("Job not found");
        }else{
        Photographer.delete(id);
        var jobs = Photographer.get()
        res.render('jobs',{jobs:jobs,userEmail: req.session.userEmail})
        }

    }
}