import multer from 'multer';

const storagegallary = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'public/Gallary/');
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    },
});

export const uploadFilemultiple = multer({storage: storagegallary});
