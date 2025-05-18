import React, { useContext } from 'react'
import './CategoryDisplay.css'
import Category from '../Category/Category'
import { assets } from "../../assets/assets";

const CatergoryDisplay = ({category}) => {
  return (
    <div className='category-display' id='category-display'>
        <h1>Student Home Page</h1>
        <div className="category-list">
            <Category name={"Daily Attendance"} image={assets.attendance_icon} to={"/mark_attendance"}/>
            <Category name={"Attendance Record"} image={assets.record} to={"/attendance_record"}/>
            <Category name={"Leave Application"} image={assets.application} to={"/leave_application"}/>
        </div>
    </div>
  )
}

export default CatergoryDisplay