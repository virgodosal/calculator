import {Navigate,} from 'react-router-dom'
import UserContext from '../UserContext';
import { useContext,useEffect } from 'react';
import Swal from 'sweetalert2';


export default function Logout() {

    const {user}  = useContext(UserContext);
    const {unsetUser, setUser} = useContext(UserContext);

    console.log(user);
    const finalUser = user.username;
    console.log(unsetUser);
    //localStorage.clear()
    unsetUser();
    
    useEffect(() => {
        setUser({id:null})
    })
    

    return  (      
       ( Swal.fire({
            title: `Thank you ${finalUser} Come Again`,
            html: 'You have successfully logged out.',
            icon: 'success',
            confirmButtonText: 'Logout',
            showCloseButton: true,
            customClass: {
              title: 'swal2-title',
              htmlContainer: 'swal2-html-container',
              confirmButton: 'swal2-confirm-button',
              closeButton: 'swal2-close-button'
            }
          }) ),


                <Navigate to="/"/>
            )
}

