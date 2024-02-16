import multer from "multer"
import { allowedExtenstions } from "../utils/allowedExtensions.js"
export const multerMiddleHost = ({
    extensions = allowedExtenstions.document,
}) => {
    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    const fileFilter = (req, file, cb) => {
        if (extensions.includes(file.mimetype.split('/')[1])) {
            return cb(null, true)
        }
        cb(new Error('document format is not allowed!'), false)
    }
    const file = multer({ fileFilter, storage })
    return file
}