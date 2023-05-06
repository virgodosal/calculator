import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faHome, faComment, faInfoCircle, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ children }) => {
  const[isOpen , setisOpen] = useState(false);
  const toggle = () => setisOpen (!isOpen);
  const menuItem = [
    {
      path: '/',
      name: 'Login',
      icon: <FontAwesomeIcon icon={faSignInAlt} />
    },
    {
      path: '/main',
      name: 'Main',
      icon: <FontAwesomeIcon icon={faHome} />
    },
    {
      path: '/comment',
      name: 'Comment',
      icon: <FontAwesomeIcon icon={faComment} />
    },
    {
      path: '/about',
      name: 'About',
      icon: <FontAwesomeIcon icon={faInfoCircle} />
    },
    {
      path: '/register',
      name: 'Register',
      icon: <FontAwesomeIcon icon={faUserPlus} />
    },
    {
      path: '/logout',
      name: 'Logout',
      icon: <FontAwesomeIcon icon={faSignOutAlt} />
    }
  ];

  return (
    <div className='container'>
      <div style={{width: isOpen ? "300px" : "80px" }} className='sidebar'>
        <div className='top_section'>
          <h1 style={{display: isOpen ? "block" : "none" }} className='logo'  >CALCULATOR</h1>
            <div style={{marginLeft: isOpen ? "10px" : "0px" }} className='bars'>
              <img src={logo} alt="My Logo" style={{ width: '50px', height: '50px' }} onClick={toggle} />

            </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            activeClassName='active'
            className='link'>
            <div className='icon'>{item.icon}</div>
            <div style={{display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar;
