import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import skullLogo from "../../../public/skull.png"
import profile_white from "../../assets/dark/akar-icons_person.svg"
import profile_black from "../../assets/light/akar-icons_person.svg"
import rdv_logo_dark from "../../assets/dark_logo.svg";
import rdv_logo_light from "../../assets/white_logo.svg";
import { imagesContext } from "../../store/images";
import hamburger_menu from "../../assets/Group_hamburger_menu.svg"
const Header = () => {

  const location = useLocation();
  const [tab, setTab] = useState("Home");
  const profileRef = useRef(null)
  const {imageTheme, isDarkMode} = useContext(imagesContext);
  useEffect(() => {
    const pathToTabMap = {
      "/": "Home",
      "/tasks": "Tasks",
      "/leaderboard": "Leaderboard",
      "/query": "Query",
      "/entrycard": "Entry Card",
      "/profile": "Profile"
    };
    const currentTab = pathToTabMap[location.pathname] || "Home";
    setTab(currentTab);
    
  }, [location.pathname]); 


  
  return (
    <div>
      <ul className={`header`}>
        <li className="rdv_circle_logo">
          {
          isDarkMode? <img src={rdv_logo_dark} alt="" />: <img src={rdv_logo_light} alt="" />
          }
        </li>
        <li className="navigation">
          <Link className={`${tab==="Home" && "active"}`} to={"/"}>
          <img  src={skullLogo} alt="" />
          Home
          </Link>
        </li>
        <li className="navigation">
          <Link  className={`${tab==="Tasks" && "active"}`} to={"/tasks"}>
          <img  src={skullLogo} alt="" />
          Tasks
          </Link>
        </li>
        <li className="navigation">
          <Link  className={`${tab==="Leaderboard" && "active"}`} to={"/leaderboard"}>
          <img src={skullLogo} alt="" />
          Leaderboard
          </Link>
        </li>
        {/* <li className="navigation">
          <Link className={`${tab==="Query" && "active"}`} to={"/query"}>
          <img src={skullLogo} alt="" />
          Notification
          </Link>
        </li> */}
        <li className="navigation">
          <Link  className={`${tab==="Entry Card" && "active"}`} to={"/entrycard"}>
          <img src={skullLogo} alt="" />
          Entry Card</Link>
        </li>
        <li className="navigation">
          <Link  className={`${tab==="Profile" && "active"}`} to={"/profile"}>
          <img src={skullLogo} alt="" />
          Profile</Link>
        </li>

        <li className="hamburger-menu">
          {/* <Link ref={profileRef} className={"hamburger"}  to={'/profile'} > */}
            <img src={imageTheme.hamburger_menu} alt="" />
          {/* </Link> */}
        </li>
      </ul>
      
    </div>
  );
};

export default Header;
