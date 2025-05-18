import express from 'express'
import { loginAdmin , loginUser, registerUser, getUser, getAllUsers, removeUser } from '../controllers/userController.js'
import multer from 'multer'
import isAuthenticated from '../middleware/auth.js'

const userRouter = express.Router()

// Image Storage
const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage})

userRouter.post('/login' ,loginUser)
userRouter.post('/admin/login' ,loginAdmin)
userRouter.post('/register',  upload.single('image'), isAuthenticated, registerUser)
userRouter.get('/get_user', isAuthenticated, getUser)
userRouter.get('/get_all_users', isAuthenticated, getAllUsers)
userRouter.post('/remove', isAuthenticated, removeUser)

export default userRouter