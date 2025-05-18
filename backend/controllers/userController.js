import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt, { hashSync } from 'bcrypt'
import userModel from '../models/userModel.js'
import Attendance from '../models/attendanceModel.js'
import LeaveRequest from '../models/leaveRequestModel.js'
import mongoose from 'mongoose'
import fs from 'fs'


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


const loginUser = async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success: false, message:"Invalid Credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        res.json({success:false, message:'Error'})
        console.log(error)
    }
}

const loginAdmin = async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success: false, message:"Invalid Credentials"})
        }
        if (!user.admin) {
            return res.json({success: false, message:"Not an Admin"})
        }
        const token = createToken(user._id)
        res.json({success:true, token, message: "Logged In"})

    } catch (error) {
        res.json({success:false, message:'Error'})
        console.log(error)
    }
}

const registerUser = async (req,res) => {
    const {name,password,email, isAdmin} = req.body;
    try {
        const adminAuth = await userModel.findById(req.body.userId);
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message:"User already exists"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }
        let admin = false
        if (isAdmin) {
            admin = isAdmin
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpwd = await bcrypt.hash(password, salt)
        let image_filename = req.file.filename
        const newUser = new userModel ({
            name: name,
            email: email,
            password: hashedpwd,
            profilePicture: image_filename,
            admin,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        console.log("User Added")
        res.json({success:true, token})

    } catch (error) {
        res.json({success:false, message:'Error'})
        console.log(error)
    }
}

const removeUser = async (req,res) => {
    try{
        const adminAuth = await userModel.findById(req.body.userId);
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        const user = await userModel.findById(req.body.uId)
        fs.unlink(`uploads/${user.profilePicture}`, () => {})
        await Attendance.updateMany(
            {},
            { $pull: { users: { userId: req.body.uId } } }
        );
        const leaveRequests = await LeaveRequest.find({});
        for (let leaveRequest of leaveRequests) {
            if(leaveRequest.userId.toString() === req.body.uId) {
                await LeaveRequest.findByIdAndDelete(leaveRequest._id);
            }
        }
        await userModel.findByIdAndDelete(req.body.uId)
        res.json({success: true, message: "User Removed"})
        
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (user){
            res.json({success: true, message: "User Data Sent", data: user})
        }
        else {
            res.json({success: false, message: "User not found"})
        }
    }
    catch {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}


const getAllUsers = async (req, res) => {
    try {
        const adminAuth = await userModel.findById(req.body.userId);
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        const user = await userModel.find({});
        if (user){
            res.json({success: true, message: "User Data Sent", users: user})
        }
        else {
            res.json({success: false, message: "User not found"})
        }
    }
    catch {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}



export {loginUser, registerUser, removeUser, getUser, loginAdmin, getAllUsers}