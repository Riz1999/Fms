import React, { useState,useEffect } from "react";
import "./Header.css";
import menu from "./menu.svg";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const check=localStorage.getItem('showAdminUI');
  if(check){
        console.log("IN If::"+check);
      }else{
        console.log("IN Else::"+check);
      }
  //localStorage.getItem('showAdminUI')
  //console.log('from header :::'+showAdminUI);
  // useEffect(()=>{
  //   //localStorage.getItem('showAdminUI');
  //   const check=localStorage.getItem('showAdminUI');
  //   if(check){
  //     setShowAdmin(true);
  //   }else{
  //   setShowAdmin(false);
  //   }
  // },[showAdminUI])
 
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    //localStorage.getItem('showAdminUI');
    const check=localStorage.getItem('userId');
    if(check){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  },[])

const onLogout = () =>{
  localStorage.removeItem("userId")
  localStorage.removeItem("token")
  localStorage.removeItem("showAdminUI")
  navigate('/')
}




 
  return ((
   
    <header>
       {check && (
      <nav className={`header__nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      
        <div className="header__logo">
          <img src={logo} alt="Logo" />
        </div>

        <ul className={`header__menu ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
       
          {check && 
           <li><a href="#food">Menu User</a> </li>
          }
           
         
          
         
          <li>
            <a href="#about">About Us</a>
          </li>
          
          <li>
            <a href="#food-selection">Selected Food</a>
          </li>
         
          {isLoggedIn && (
            <li>
              <button className="logout-button" onClick={onLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        <ul className="header__menu-mobile" data-aos="fade-down">
          <li>
            <img src={menu} alt="menu" onClick={toggleMobileMenu} />
          </li>
        </ul>
        
      </nav>
       )}
    </header>
  
  )
    
  );
};


export default Header;


