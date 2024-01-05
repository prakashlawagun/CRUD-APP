import React, { useEffect, useState } from 'react'
import '../adduser/add.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
function Edit() {

    const users = {
        fname: "",
        lname: "",
        email:"",
    }
    const navigate = useNavigate();

    const { id } = useParams();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
   
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                navigate("/")
            }).catch((err) => { 
                console.log(err);
            })
    }



  return (
    <div className='addUser'>
    <Link to="/">Back</Link>
    <h3>Update User Form</h3>
    <form onSubmit={submitForm} className='addUserForm'>
        <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input type="text" name="fname" value={user.fname} id="fname" autoComplete='off' placeholder='Frist Name' onChange={inputChangeHandler} />
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input type="text" name="lname" id="lname" value={user.lname} autoComplete='off' placeholder='Last Name' onChange={inputChangeHandler} />
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={user.email} autoComplete='off' placeholder='Email' onChange={inputChangeHandler} />
        </div>
        <div className="inputGroup">
            <button type='submit'>Update</button>
        </div>
    </form>
</div>
  )
}

export default Edit