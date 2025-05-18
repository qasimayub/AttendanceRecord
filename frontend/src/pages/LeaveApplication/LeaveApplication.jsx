import React, { useContext, useState } from 'react';
import './LeaveApplication.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from "../../contexts/storeContext";

const LeaveApplication = () => {
  const {url} = useContext(StoreContext)
  const [data, setData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const changeHandler = (evt) => {
    setData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/leave/submit_request`,
        { data },
        { headers: { token: localStorage.getItem('token') } }
      );
      if (response.data.success) {
        setData({
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error submitting leave application');
    }
  };

  return (
    <form onSubmit={submitHandler} className="leave-application">
      <div className="multiform">
        <p>Leave Type</p>
        <input
          onChange={changeHandler}
          type="text"
          name="leaveType"
          placeholder="Leave Type"
          value={data.leaveType}
          required
        />
      </div>
      <div className="multiform">
        <p>Start Date</p>
        <input
          onChange={changeHandler}
          type="date"
          name="startDate"
          value={data.startDate}
          required
        />
      </div>
      <div className="multiform">
        <p>End Date</p>
        <input
          onChange={changeHandler}
          type="date"
          name="endDate"
          value={data.endDate}
          required
        />
      </div>
      <div className="multiform">
        <p>Reason</p>
        <textarea
          onChange={changeHandler}
          name="reason"
          placeholder="Reason for leave"
          value={data.reason}
          required
        />
      </div>
      <button formAction="submit">Submit</button>
    </form>
  );
};

export default LeaveApplication;
