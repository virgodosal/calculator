import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/Sidebar';
import Comment from './Pages/Comment';
import Main from './Pages/Main';
import Login from './Pages/Login';
import About from './Pages/About';
import Logout from './Pages/Logout';
import Register from './Pages/Register';
import { UserProvider } from './UserContext';
import {useEffect, useState} from 'react'

const App = () => {

  const [user, setUser] = useState({
    id: null,
    username: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {

      // User is Logged in
      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          id: data.username,
          isAdmin: data.isAdmin
        })
      }
      // User is logged out
      else {
        setUser({
          id: null,
          username: null,
          isAdmin: null
        })
      }
    })
  }, []);





  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/main' element={<Main/>}/>
            <Route path='/comment' element={<Comment/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;

