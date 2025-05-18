import  connectDb from "../config/db.js";
import {assets} from './assets/assets.js'
import User from "../models/userModel.js";
import Attendance from "../models/attendanceModel.js";
import leaveRequest from "../models/leaveRequestModel.js";
import bcrypt, { hashSync } from 'bcrypt'
import attendanceModel from "../models/attendanceModel.js";

//initialize
connectDb()

const seedDb = async () => {
    // await User.deleteMany({})
    // await leaveRequest.deleteMany({}) 
    await attendanceModel.deleteMany({})
    // for (let i=0; i<assets.users.length;i++)
    //     {
    //     const salt = await bcrypt.genSalt(10)
    //     const hashedpwd = await bcrypt.hash("12345678", salt)
    //     const user = new User({
    //         name: assets.users[i].name,
    //         email: assets.users[i].email,
    //         password: hashedpwd,
    //         admin: false,
    //         profilePicture: assets.users[i].profilePicture
    //     })
    //     await user.save()
    //     console.log(`${assets.users[i]._id} saved`)
    //     }
    // for (let i = 0; i < assets.leaveRequests.length; i++) {
    //     const request = new leaveRequest(assets.leaveRequests[i])
    //     await request.save();
    //     console.log("Request added")
    // }
    for (let i = 0; i < assets.attendance.length; i++) {
        const attendance = new attendanceModel(assets.attendance[i])
        await attendance.save();
        console.log("attendance added")
    }
}

seedDb()
