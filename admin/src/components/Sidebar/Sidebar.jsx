import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to={'/add'} className="sidebar-option">
                <img src={assets.attendance_icon} alt="" />
                <p>Add Student</p>
            </NavLink>
            <NavLink to={'/leaveapp'} className="sidebar-option">
                <img src={assets.application} alt="" />
                <p>Leave Applications</p>
            </NavLink>
            <NavLink to={'/allrecords'} className="sidebar-option">
                <img src={assets.calendar} alt="" />
                <p>All Attendance Records</p>
            </NavLink>
            <NavLink to={'/allstudents'} className="sidebar-option">
                <img src={assets.attendance_icon} alt="" />
                <p>All Students</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar