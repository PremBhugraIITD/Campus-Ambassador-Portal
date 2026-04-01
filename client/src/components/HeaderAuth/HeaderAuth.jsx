import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { imagesContext } from '../../store/images';
import rdv_logo_dark from "../../assets/dark_logo.svg";
import rdv_logo_light from "../../assets/white_logo.svg";
import './HeaderAuth.css'
const HeaderAuth = () => {

    const location = useLocation();
    const [tab, setTab] = useState("Home");
    const {imageTheme, isDarkMode} = useContext(imagesContext);
    useEffect(() => {
      const pathToTabMap = {
        "/": "Home",
        "/profile": "Profile"
      };
      const currentTab = pathToTabMap[location.pathname] || "Home";
      setTab(currentTab);
      
    }, [location.pathname]); 
  
  
  return (
    <div>
        <ul className={`headerAuth`}>
            <li className="rdv_circle_logo">
              {
              isDarkMode? <img src={rdv_logo_dark} alt="" />: <img src={rdv_logo_light} alt="" />
              }
              
            </li>
            <li>
            <h2 style={{color:'var(--primary-color)'}}>
                    RENDEZVOUS
                </h2>
            </li>
            <li >
            <Link 
              className={`${tab==="Profile" && "profileActive"} ${"profile"}`}
              to={'https://auth.rdv-iitd.org/authorise?client_id=4D97tr48z1RD4Nit2IV8wQcy60THlcwb&redirect_uri=https://cap.rdv-iitd.org'}
               >
                <img src={imageTheme.login_person_icon} alt="" />
            </Link>
            </li>
        </ul>
        
    </div>
  );
}

export default HeaderAuth;
