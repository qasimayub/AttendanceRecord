import React, { useContext, useEffect, useState } from "react";
import "./AttendanceRecord.css";
import { StoreContext } from "../../contexts/storeContext";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const AttendanceRecord = ({setLogin}) => {
  const { token, user, attendanceRecords, days, userId, loadData } = useContext(StoreContext);
  
  return (
    <div className="attendance-record">
      <h2>
          Your Attendance Record
      </h2>
      <hr />
      <div className="attendance-table">
        <h3 className="heading">Day</h3>
        <h3 className="heading">Date</h3>
        <h3 className="heading">Status</h3>
      </div>
      {token && attendanceRecords ? 
        attendanceRecords.map((attend, index) => {
        attend.date = new Date(attend.date);
        return attend.users
          .filter((user) => user.userId._id.toString() === userId)
          .map((user, userIndex) => (
            <div className="attendance-table" key={`${index}-${userIndex}`}>
              <p>{days[attend.date.getDay()]}</p>
              <p>{attend.date.toLocaleDateString()}</p>
              <p>{user.status}</p>
            </div>
          ));
        })
      : <></>
      }
    </div>
  )

};

export default AttendanceRecord;
