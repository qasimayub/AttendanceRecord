import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";

const markAttendance = async (req, res) => {
    const { uId, date, status } = req.body;

    try {
        // Check if attendance already exists for the same user and date
        const existingAttendance = await Attendance.findOne({ date });
        if (existingAttendance) {
            const isMarked = existingAttendance.users.filter((user => user.userId._id === uId))
            if(isMarked) {
                existingAttendance.users.forEach((user) => {
                    if (user.userId._id == uId){ user.status = status }
                })
            await existingAttendance.save()
            return res.json({
                    success: true,
                    message: "Attendance updated.",
                });
            }
            existingAttendance.users.push({
                uId,
                status: status
            })
            await existingAttendance.save()
            return res.json({
                success: true,
                message: "Attendance marked successfully",
            });
        }
        
        const attendance = new Attendance({
            users: [],
            date
        });
        attendance.users.push({
            uId,
            status: status
        })
        attendance.date.setHours(0, 0, 0, 0)

        await attendance.save();
        res.json({
            success: true,
            message: "Attendance marked successfully.",
            data: attendance,
        });
    } catch (e) {
        res.json({
            success: false,
            message: "Error marking attendance.",
        });
        console.error(e);
    }
};

const getAttendanceList = async (req, res) => {
    const {date} = req.body
    await initializeDailyAttendance(req, res)
    try {
        const attendanceRecords = await Attendance.find({}).populate('users.userId', 'name');
        res.json({
            success: true,
            attendance: attendanceRecords,
            userId: req.body.userId
        });
    } catch (e) {
        res.json({
            success: false,
            message: "Error fetching attendance records.",
        });
        console.error(e);
    }
};

const removeAttendance = async (req, res) => {
    const {id} = req.body
    try {
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found.",
            });
        }
        await Attendance.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Attendance record removed.",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error removing attendance record.",
        });
        console.error(e);
    }
};

const initializeDailyAttendance = async (req, res) => {
    const { date } = req.body;
    try {
        const existingRecords = await Attendance.find({ date });
        if (existingRecords.length > 0) {
            return
        }
        // Fetch all users and mark them as absent
        const users = await User.find({});
        const userRecords = []
        users.map((user) => (userRecords.push({userId: user._id, status: "Absent"})));

        const newAttendance  = new Attendance({
            users: userRecords,
            date: date
        })
        newAttendance.date.setHours(0, 0, 0, 0)
        await newAttendance.save()

        return
    } catch (e) {
        console.error(e);
    }
};

const updateAttendance = async (req, res) => {
    const { userId, date, status } = req.body;
    date.setHours(0, 0, 0, 0)
    try {
        // Find the attendance record for the user and date
        const attendance = await Attendance.findOne({ date });

        if (!attendance) {
            return res.json({
                success: false,
                message: "Attendance record not found.",
            });
        }
        const user = await User.findById(userId)
        const attendanceIndex = user.attendance.findIndex(attend => attend.date.toDateString() == date.toDateString())
        user.attendance[attendanceIndex].status = status
        const userIndex = attendance.users.findIndex(user => user.userId === userId);
        attendance.users[userIndex].status = status
        await attendance.save();
        await user.save();

        res.json({
            success: true,
            message: "Attendance updated successfully.",
            attendance,
        });
    } catch (e) {
        res.json({
            success: false,
            message: "Error updating attendance.",
        });
        console.error(e);
    }
};

export {
    initializeDailyAttendance,
    updateAttendance,
    markAttendance,
    getAttendanceList,
    removeAttendance,
};