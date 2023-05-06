import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const Comment = () => {
    const [comment, setComment] = useState('');
    const {user}  = useContext(UserContext);

    const FinalUser = user.username
    console.log(FinalUser)


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  const Comments = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: FinalUser,
            comments: comment
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Login Data: ");
        console.log(data);
        setComment("")

        Swal.fire({
            title: 'Thank you for your Comments',
            icon: 'success',
            confirmButtonText: 'Thank you!!',
            showCloseButton: true,
            customClass: {
              title: 'swal2-title',
              htmlContainer: 'swal2-html-container',
              confirmButton: 'swal2-confirm-button',
              closeButton: 'swal2-close-button'
            }
          })
       
    }) 
  

}; 
  


  return (
    
    <div>
      <h1 className='Page'>Comment Page</h1>
      <textarea
        className='textArea'
        value={comment}
        onChange={handleCommentChange}
        rows={8}
        style={{ minHeight: '10em', minWidth: '80%' }}
        placeholder="Type your comment here... "
      />
         <Button  className='buttonComment' onClick={Comments} >Add Comment</Button>
    </div>
  );
};

export default Comment;
