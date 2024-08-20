import express from "express"
import path from 'path';
import multer from 'multer'
import { uploadImage,getImage } from "../controller/imgcontroller.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use a unique name for each file
    }
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });


const router =express.Router()


router.post('/upload',upload.single('file'),uploadImage)
 router.get('/file/:fileId', getImage);

export default router;