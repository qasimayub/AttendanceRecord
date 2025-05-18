import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { getAttendanceList, markAttendance, removeAttendance, updateAttendance } from "../controllers/attendanceController.js";

const attendanceRouter = express.Router()

attendanceRouter.post('/mark_attendance', isAuthenticated, markAttendance)
attendanceRouter.post('/remove', isAuthenticated, removeAttendance)
attendanceRouter.post('/list', isAuthenticated, getAttendanceList)

export default attendanceRouter