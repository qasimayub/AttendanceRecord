import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)

  const [data, setData] = useState({
    name:'',
    email: '',
    password: '',
    isAdmin: false
  })

  const changeHandler = (evt) => {
    setData((prev)=>({...prev, [evt.target.name]:evt.target.value}))
  }

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const user = new FormData();
    user.append("name",data.name)
    user.append("email",data.email)
    user.append("password",data.password)
    user.append("isAdmin",data.isAdmin)
    user.append("image",image)
    const response = await axios.post(`${url}/api/user/register`, user, {headers: {token: localStorage.getItem("token")}})
    if (response.data.success) {
      setData({
        name:'',
        email: '',
        password: '',
        isAdmin: false
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
        <form onSubmit={submitHandler} className="add-user ">
            <div className="image multiform">
              <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} required type="file" name="image" id="image" hidden />
            </div>
            <div className="multiform ">
              <p>Name</p>
              <input onChange={changeHandler} type="text" name="name" required placeholder='Name' value={data.name}/>
            </div>
            <div className="multiform ">
              <p>Email</p>
              <input onChange={changeHandler} type="email" required name="email" placeholder='Email' value={data.email}></input>
            </div>
            <div className="multiform ">
              <p>Password</p>
              <input onChange={changeHandler} type="password" required name="password" placeholder='Password' value={data.password}></input>
            </div>
            <div className="isAdmin ">
              <p>Admin</p>
              <input 
                onChange={(evt) => setData((prev) => ({ ...prev, isAdmin: evt.target.checked }))} 
                type="checkbox" 
                name="admin" 
                checked={data.isAdmin} 
              />
            </div>
            <button formAction='submit'>Submit</button>
        </form>
  )
}

export default Add