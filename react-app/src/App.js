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


const App = () => {
  return (

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


  )
}

export default App;

