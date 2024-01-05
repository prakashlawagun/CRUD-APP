import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './user.css'
import { toast } from 'react-hot-toast';
function User() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => { 
            const response = await axios.get("http://localhost:8000/api/getall")
            setUser(response.data);
        }
        fetchData();
    }, [])

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((response) => {
                console.log(response)
                setUser((prevUser) => prevUser.filter((user) => user._id !== userId))
                toast.success(response.data.message, { position: "top-right" });
            })
            .catch((err) => {
                console.log(err);
        })
    }


  return (
      <div className='userTable'>
          <Link to={"/add"} className='addButton' >Add User</Link>
          <table border={1} cellPadding={10} cellSpacing={0}>
              <thead>
                  <tr>
                      <th>S.No.</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>User Password</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      users.map((user, index) => {
                          return (
                            <tr key={user._id}>
                                  <td >{ index+1}</td>
                                  <td>{user.fname}{ user.lname}</td>
                                  <td>{ user.email}</td>
                                  <td>{ user.password}</td>
                            <td className='actionButton'>
                               <Link to={`/edit/`+ user._id} ><i className="fa-solid fa-pen-to-square"></i></Link>
                               <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                            
                        </tr>
                          )
                      })
                  }
              </tbody>
          </table>
    </div>
  )
}

export default User