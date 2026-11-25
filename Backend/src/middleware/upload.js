import multer from 'multer';
import path from 'path';

// Halka sawirka lagu keydiyo iyo magaca file-ka (waqti + tiro random ah + extension)

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb)=>
        cb(null, Date.now() + '-' + Math.round(Math.random() *1e6) +path.extname(file.originalname)),

})

// sawiro kliya
const fileFilter = (req, file, cb)=>{
 if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only images are allowed'));
}

// Cabbirka ugu weyn: 5MB (beddel haddii aad rabto)
export const upload = multer({
    storage, fileFilter, limits:{fileSize: 5 * 1024 * 1024}
})