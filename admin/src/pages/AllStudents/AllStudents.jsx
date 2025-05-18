import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../contexts/storeContext";
import axios from "axios";
import "./AllStudents.css"; // Add your styling file

const AllStudents = () => {
  const { url, token, loadData, users, setUsers, admin, setAdmin } = useContext(StoreContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/get_all_users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  

  const deleteUser = async (uId) => {
    try {
      const response = await axios.post(`${url}/api/user/remove`, {uId}, {
        headers: { token: localStorage.getItem("token") },
      });
      console.log(response)
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!token) {
    return <div>Please login</div>;
  }

  if (!users || users.length === 0 || !admin) {
    return <div></div>;
  }

  return (
    <div className="all-users">
      <h2>All Users</h2>
      <hr />
      <div className="user-table">
        <h3 className="heading">Name</h3>
        <h3 className="heading">Email</h3>
        <h3 className="heading admin-delete">Admin</h3>
        <h3 className="heading admin-delete">Delete</h3>
      </div>
      {users.map((user) => (
        <div key={user._id} className="user-table">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p className={`admin-delete ${user.admin?"yes":"no"}`} >{user.admin?"Yes":"No"}</p>
          {user.admin?<div></div>:<button onClick={() => deleteUser(user._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default AllStudents;
