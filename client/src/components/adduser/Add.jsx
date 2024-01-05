import React, { useState } from 'react'
import "./add.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Add() {

    const users = {
        fname: "",
        lname: "",
        email: "",
        password:""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                console.log(response);
                navigate("/")
            }).catch((err) => { 
                console.log(err);
            })

    }

  return (
      <div className='addUser'>
          <Link to="/">Back</Link>
          <h3>Add new user</h3>
          <form onSubmit={submitForm} className='addUserForm'>
              <div className="inputGroup">
                  <label htmlFor="fname">First Name</label>
                  <input type="text" onChange={inputHandler} name="fname" id="fname" autoComplete='off' placeholder='Frist Name'/>
              </div>
              <div className="inputGroup">
                  <label htmlFor="lname">Last Name</label>
                  <input type="text" onChange={inputHandler} name="lname" id="lname" autoComplete='off' placeholder='Last Name'/>
              </div>
              <div className="inputGroup">
                  <label htmlFor="email">Email</label>
                  <input type="email" onChange={inputHandler} name="email" id="email" autoComplete='off' placeholder='Email'/>
              </div>
              <div className="inputGroup">
                  <label htmlFor="password">Password</label>
                  <input type="password" onChange={inputHandler} name="password" id="password" autoComplete='off' placeholder='Password'/>
              </div>

              <div className="inputGroup">
                  <button type='submit'>Add</button>
              </div>
          </form>
    </div>
  )
}

export default Add