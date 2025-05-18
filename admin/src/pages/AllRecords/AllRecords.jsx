import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../contexts/storeContext";
import axios from "axios";
import "./AllRecords.css"; // Add your styling file
import { toast } from "react-toastify";

const AllRecords = () => {
  const {
    url,
    attendanceRecords,
    token,
    days,
    loadData,
  } = useContext(StoreContext);

  useEffect(() => {
    loadData();
  }, []);

  const markAttendance = async (date, uId, status) => {
    try {
      const response = await axios.post(
        `${url}/api/attendance/mark_attendance`,
        { uId, status, date },
        { headers: { token } }
      );
      console.log(response.data);
      await loadData();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const removeAttendance = async (id) => {
    try {
      const response = await axios.post(
        `${url}/api/attendance/remove`,
        { id },
        { headers: { token } })
        if(response.data.success) {
          toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message)
        }
    } catch (error) {
      console.error("Error removing attendance:", error);
      
    }
  }

  if (!token) {
    return <div>Please login</div>;
  }

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return <div></div>;
  }

  const sortedRecords = attendanceRecords.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="all-records">
      <h2>Attendance Records</h2>
      {sortedRecords.map((attendance) => (
        <div key={attendance._id} className="daily-attendance">
          <hr />
          <div className="attendance-title">
          <h3>
            Attendance for {days[new Date(attendance.date).getDay()]}{" "}
            {new Date(attendance.date).toLocaleDateString()}
          </h3>
          <button onClick={() =>
                    removeAttendance(attendance._id)
                  }>Delete Record</button>
          </div>
          <div className="attendance-table">
            <h3 className="heading">Name</h3>
            <h3 className="heading">Status</h3>
            <h3 className="heading">Actions</h3>
          </div>
          {attendance.users.map((user) => (
            <div key={user.userId._id} className="attendance-table">
              <p>{user.userId.name}</p>
              <p>{user.status}</p>
              <div className="actions">
                <button
                  onClick={() =>
                    markAttendance(attendance.date, user.userId._id, "Present")
                  }
                >
                  Mark Present
                </button>
                <button
                  onClick={() =>
                    markAttendance(attendance.date, user.userId._id, "Absent")
                  }
                >
                  Mark Absent
                </button>
              </div>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllRecords;
