import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import Add from './pages/Add/Add'
import Leave from './pages/Leave/Leave'
import AllRecords from './pages/AllRecords/AllRecords'
import AllStudents from './pages/AllStudents/AllStudents'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from './components/LoginPopup/LoginPopup'
import { useContext } from 'react'
import { StoreContext } from './contexts/storeContext'
import axios from 'axios'


function App() {
  const {login, setLogin, token, url, setAdmin} = useContext(StoreContext)
  if(login) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'scroll'
  }

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'>
        {!token? <LoginPopup login={login} setLogin={setLogin} /> : <></>}
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/leaveapp' element={<Leave url={url}/>}></Route>
          <Route path='/allrecords' element={<AllRecords url={url}/>}></Route>
          <Route path='/allstudents' element={<AllStudents url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
