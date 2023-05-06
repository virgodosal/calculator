import React, { useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import UserContext from '../UserContext'; 
import {Navigate} from 'react-router-dom';

const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Data: `)
      console.log(data)
      console.log(`ito un: ${data.access}`)
    
           if(typeof data.access !== "undefined") {
      
        localStorage.setItem('token', data.access);
        console.log(data) 
  
         retrieveUserDetails(data.access);

        Swal.fire({
            title: `Welcome back ${username}`,
            html: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'Calculate',
            showCloseButton: true,
            customClass: {
              title: 'swal2-title',
              htmlContainer: 'swal2-html-container',
              confirmButton: 'swal2-confirm-button',
              closeButton: 'swal2-close-button'
            }
          })
                      
      }  

       else {
            Swal.fire({
              title: 'Error!',
              text: 'Invalid username / Not Found',
              icon: 'failed',
              confirmButtonText: 'OK'
            });
            setErrorMessage(data.message);
            setUsername('');
          }

        })

      .catch(error => {
        setErrorMessage(`What is the error: ${error}}`);
        });
 
    }
   

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log("Login Data: ");
        console.log(data);
        setUser({
            id: data._id,
            username: data.username,
            isAdmin: data.isAdmin
        })
    }) 
    console.log(`User Info: `)
   
}; 
 



  return (
    (user.id !== null) ?
   <Navigate to="/main" />
    :
    <div id='userRegister'>
      <div>
        <h1 className='headRegister'>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className='username'>
            <input className="inputRegister" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
           <p className='user'>Username</p>
          <Button className="buttonReg" variant="primary" type="submit">Login</Button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};


export default Login;
