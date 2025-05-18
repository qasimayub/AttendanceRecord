import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [login, setLogin] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({});

  async function loadData() {
    const token = localStorage.getItem("token")
    if (token) {
      setToken(token);
      const date = new Date()
      date.setHours(0,0,0,0)
      const response = await axios.post(url + "/api/attendance/list", {date},{
        headers: { token: localStorage.getItem("token")}});
      setUserId(response.data.userId)
      setAttendanceRecords(response.data.attendance)
      const userResponse = await axios.get(url + "/api/user/get_user",{
        headers: { token: localStorage.getItem("token")}});
    
      setUser(userResponse.data.data)
    }
  }
  
  useEffect(() => {
    loadData();
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const scrollToTop = () => {
    const topElement = document.getElementById("top");
    topElement.scrollIntoView({ behavior: "smooth" });
  };
  
  const [token, setToken] = useState("");

  const contextValue = {
    login,
    setLogin,
    url,
    token,
    setToken,
    scrollToTop,
    attendanceRecords,
    user,
    userId,
    setUserId,
    setAttendanceRecords,
    days,
    loadData
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
