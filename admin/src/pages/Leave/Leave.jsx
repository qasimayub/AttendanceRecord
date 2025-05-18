import React, { useEffect, useState } from 'react'
import './Leave.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/storeContext'

const Leave = ({url}) => {
  const {token} = useContext(StoreContext)
  const [leaveData, setLeaveData] = useState([])
  async function fetchData() {
    const response = await axios.get(`${url}/api/leave/request_list`, {headers: {token: localStorage.getItem("token")}})
    if (response.data.success) {
      setLeaveData(response.data.data)
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleClick = async (leaveId, status) => {
    const response = await axios.post(url + "/api/leave/handle_request", {leaveId, status}, {headers: {token}})
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchData()
    }
  }

  const deleteRequest = async (leaveId) => {
    const response = await axios.post(url + "/api/leave/removeRequest", {leaveId}, {headers: {token}})
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchData()
    }
  }


  return (
    <div className='list'>
      <h2>All Leave Applications</h2>
      <div className="list-grid">
        <b>Student Name</b>
        <b>Leave Type</b>
        <b>Start Date</b>
        <b>End Date</b>
        <b>Reason</b>
        <b>Status</b>
        <b>Action</b>
      </div>
      {
        leaveData.map((item,i) => {
          return <div key={i} className="list-grid list-item">
            <p className='description'>{item.userId.name}</p>
            <p className='description'>{item.leaveType}</p>
            <p className='date'>{`${new Date(item.startDate).getDate()}/${new Date(item.startDate).getMonth()+1}/${new Date(item.startDate).getFullYear()}`}</p>
            <p className='date'>{`${new Date(item.endDate).getDate()}/${new Date(item.endDate).getMonth()+1}/${new Date(item.endDate).getFullYear()}`}</p>
            <p className='description'>{item.reason}</p>
            <p className='description'>{item.status}</p>
            {item.status=="Pending"?<div className='buttons' ><button onClick={() => handleClick(item._id, "Approved")} className='action'>Approve</button><button onClick={() => handleClick(item._id, "Denied")} className='action'>Reject</button></div>:<div className='buttons' ><button onClick={() => deleteRequest(item._id)} className='action'>Delete</button></div>}
        </div>
        })
      }
    </div>
  )
}

export default Leave
