import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {user}  = useContext(UserContext);

  const FinalUser = user.username
  console.log(FinalUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/registers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        Swal.fire({
          title: 'Success!',
          text: 'Succesfully Register User',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setUsername('');
        
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid username / Duplicate Username',
          icon: 'failed',
          confirmButtonText: 'OK'
        });
        setErrorMessage(data.message);
        setUsername('');
      }
    })
    .catch(error => {
      setErrorMessage('An error occurred while registering the user.');
    });
  };

  return (
  (user.id !== null) ?
  (alert('You are already registered!'), <Navigate to="/main" />)
    :
    <div id='userRegister'>
      <div>
        <h1 className='headRegister'>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <label className='username'>
            <input className="inputRegister"  type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
           <p className='user'>Username</p>
          <Button className="buttonReg" variant="primary" type="submit">Register</Button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
