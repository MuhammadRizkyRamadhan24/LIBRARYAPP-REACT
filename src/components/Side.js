import React, { useState } from 'react';
import '../styles/hehe.css';
import BurgerMenu from '../assets/icons8-menu-64.png'

function Profile() {
  const [active, setInactive] = useState(false);
  const toggleNavbar = () => {
    setInactive(!active);
  };
  return(
    <>
    <div className={active ? 'sidebar-container active' : 'sidebar-container inactive'}>
      <div className='hamburger'>
          <div>
                <img src={BurgerMenu} className='icon' aria-hidden="true" onClick={toggleNavbar} style={{cursor: 'pointer'}}/>
          </div>
      </div>
      <div className={active ? 'content-link' : 'content-link content-none'}>
          <ul className='avatar'>
              <li></li>
              <li>Niki Zevanya</li>
          </ul>
          <ul className='navigator'>
            <li>Explore</li>
            <li>History</li>
            <li>Add books</li>
          </ul>
      </div>
    </div>
    </>
  )
}

export default Profile;