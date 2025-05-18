import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";


const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [login, setLogin] = useState(true)
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(0)

  async function loadData() {
    if (token) {
      setToken(token);
      const date = new Date()
      date.setHours(0,0,0,0)
      const response = await axios.post(url + "/api/attendance/list", {date},{
      headers: { token: localStorage.getItem("token")}});
      setAttendanceRecords(response.data.attendance)
    }
  }

  useEffect(()=> {
    setToken(localStorage.getItem("token"))
    loadData()
    async function getAdmin() {
      const response = await axios.get(url+"/api/user/get_user", {headers: {token}})
      setAdmin(response.data.data)
    }
    getAdmin()
  })

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  const writeDate = (attend) => {
    return `${attend.date.getDate()}/${attend.date.getMonth()}/${attend.date.getFullYear()}`
  }

  const [token, setToken] = useState("");

  const contextValue = {
    login,
    setLogin,
    url,
    token,
    setToken,
    attendanceRecords,
    users,
    setUsers,
    writeDate,
    setAttendanceRecords,
    days,
    loadData,
    admin,
    setAdmin
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
