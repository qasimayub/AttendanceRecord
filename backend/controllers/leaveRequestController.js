import leaveRequest from "../models/leaveRequestModel.js";
import fs from 'fs'
import userModel from "../models/userModel.js";
import attendanceModel from "../models/attendanceModel.js";


const submitRequest = async (req,res) => {
    // console.log("requesting")
    const actualStartDate = new Date(req.body.data.startDate)
    actualStartDate.setHours(0,0,0,0)
    const actualEndDate = new Date(req.body.data.endDate)
    actualEndDate.setHours(0,0,0,0)
    const request = new leaveRequest ({
        userId: req.body.userId,
        leaveType: req.body.data.leaveType,
        startDate: actualStartDate,
        endDate: actualEndDate,
        reason: req.body.data.reason,
    })
    try {
        await request.save()
        res.json({success: true, message: "Food Added"})
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}


const getRequestList = async(req,res) => {
    try{
        const adminAuth = await userModel.findById(req.body.userId);
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        const requests = await leaveRequest.find({}).populate("userId", "name")
        if (requests) {
            res.json({success: true, data: requests})
        }
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}

const handleRequest = async (req,res) => {
    try {
        const adminAuth = await userModel.findById(req.body.userId);
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        const request = await leaveRequest.findByIdAndUpdate(req.body.leaveId, {status: req.body.status}, { new: true })
        if (req.body.status === "Approved") {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            startDate.setHours(0,0,0,0)
            endDate.setHours(0,0,0,0)
            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
              let attendance = await attendanceModel.findOne({ date: date });
          
              if (!attendance) {
                attendance = new attendanceModel({ date: date, users: [] });
              }
          
              const userIndex = attendance.users.findIndex(
                (user) => user.userId.toString() === request.userId.toString()
              );
          
              if (userIndex !== -1) {
                attendance.users[userIndex].status = "Leave";
              } else {
                attendance.users.push({
                  userId: request.userId,
                  status: "Leave",
                });
            }
              await attendance.save();
        }}
    res.json({success: true, message: "Status Updated"})}

    catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}

const removeRequest = async (req,res) => {
    try{
        const adminAuth = await userModel.findById(req.body.userId);
        console.log(adminAuth)
        if(!adminAuth.admin) {return res.json({success: false, message:"Your are not authorized"})}
        await leaveRequest.findByIdAndDelete(req.body.leaveId)
        res.json({success: true, message: "Request Removed"})
    } catch (e) {
        res.json({success: false, message: "Error"})
        console.log(e)
    }
}


export {
    submitRequest,
    getRequestList,
    removeRequest,
    handleRequest
}