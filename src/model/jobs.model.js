export default class Photographer{
    constructor( _id, _name, _desc, _contact, _gmail, _linkdin, _imageUrl){
        this.id = _id
        this.name = _name
        this.desc = _desc
        this.contact = _contact
        this. gmail = _gmail
        this.linkdin = _linkdin
        this.imageUrl  = _imageUrl
    }
    static get(){
        return PhotographerDetails
    }

    static getById(id) {
        const jobId = parseInt(id);
        return PhotographerDetails.find(job => job.id === jobId);
    }
    static addjob(name, description, contact, gmail, linkdin,imageUrl){
        let newjob = new Photographer(
            PhotographerDetails.length+1,
            name,
            description,
            contact,
            gmail,
            linkdin,
            imageUrl
        )
        PhotographerDetails.push(newjob);
    }
    static delete(id){
        const index = jobs.findIndex((job) => job.id == id);
        jobs.splice(index, 1);
    }
    
}

const PhotographerDetails = [
    new Photographer(1,'Rashmika Mandana','Wedding Photographer','0888888888','demo@gmail.com','https://www.linkedin.com/in/abhishekprajapat423/','../../Photo/Photo.jpg'),
    new Photographer(2,'John','Professional Photographer','0888888888','demo@gmail.com','https://www.linkedin.com/in/abhishekprajapat423/','../../Photo/Photo2.jpg'),
    new Photographer(3,'Jyoti Singh','Wedding Photographer','0888888888','demo@gmail.com','https://www.linkedin.com/in/abhishekprajapat423/','../../Photo/Photo3.jpg'),
    
]