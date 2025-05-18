import React, {useContext, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AttendanceRecord from './pages/AttendanceRecord/AttendanceRecord'
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import DailyAttendance from './pages/DailyAttendance/DailyAttendance'
import { StoreContext } from "./contexts/storeContext";
import LeaveApplication from "./pages/LeaveApplication/LeaveApplication";

const App = () => {
  const {login, setLogin} = useContext(StoreContext)
  if(login) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'scroll'
  }
  return (
    <>
    {login?<LoginPopup login={login} setLogin={setLogin} />:<></> }
      <div className="App">
        <div id="top"></div>
        <Navbar setLogin={setLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/attendance_record' element={<AttendanceRecord />}></Route>
          <Route path='/mark_attendance' element={<DailyAttendance/>}></Route>
          <Route path='/leave_application' element={<LeaveApplication/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
