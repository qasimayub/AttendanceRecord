import React, { useContext, useState, useEffect } from "react";
import "./DailyAttendance.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/storeContext";
import axios from "axios";

const DailyAttendance = () => {
  const { loadData, url, setUserId, attendanceRecords, setToken, userId, days, token } =
  useContext(StoreContext);
  const today = new Date()
  const attendance = attendanceRecords.find((record) => new Date(record.date).toDateString() === today.toDateString())
  if (attendance) attendance.date = new Date(attendance.date)
  
    const markAttendance = async (uId, status) => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const response = await axios.post(
          url + "/api/attendance/mark_attendance",
          { date: today, uId, status },
          { headers: { token } }
        );
        await loadData()
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    };
  
  return (<>
    {token? attendance? <div className="daily-attendance">
      <h2>
        Attendance for{" "}
        {
          days[attendance.date.getDay()]
        }{" "}
        {attendance.date.toLocaleDateString()}
      </h2>
      <hr />
      <div className="buttons">
        <h3>Click to mark your attendance: </h3>
        <button  onClick={() => markAttendance(userId, "Present")}>
          Mark Present
        </button>
        <button  onClick={() => markAttendance(userId, "Absent")}>
          Mark Absent
        </button>
      </div>
      <hr />
      <h3 className="heading">Today's Attendance:</h3>
      <div>
        <div className="attendance-table">
          <h3 className="heading">Name</h3>
          <h3 className="heading">Status</h3>
        </div>
        {attendance.users.map((user) => (
          <div key={`${user.userId._id}`} className="attendance-table">
            <p>{user.userId.name}</p>
            <p>{user.status}</p>
          </div>
        ))}
      </div>
    </div>:<div></div>:
    <div>Please login to continue</div>}
    </>
  );
};

export default DailyAttendance;
