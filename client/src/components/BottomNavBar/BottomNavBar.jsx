import React, { useContext, useEffect, useState } from "react";
import "./BottomNavBar.css"; 
import home_img from "../../assets/home.svg"; 
import task_img_active from "../../assets/task_active.svg";
import leaderboard_img from "../../assets/leaderboard.svg";
import id_img from "../../assets/entrycard.svg";
import profile_img from "../../assets/profile_bottom.svg";
import home_img_active from "../../assets/home_active.svg"; 
import task_img from "../../assets/task.svg";
import leaderboard_img_active from "../../assets/leaderboard_active.svg";
import id_img_active from "../../assets/entrycard_active.svg";
import profile_img_active from "../../assets/profile_bottom_active.svg";
import { Link, useLocation } from "react-router-dom";
import { imagesContext } from "../../store/images";

const BottomNavBar = () => {
  
  const location = useLocation();
  const [tab, setTab] = useState("Home");
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
    <div className="bottom-nav">
      <div className="nav-item">
        <Link to={'/'} className={`${tab==="Home" && "active"}`} >
        {
          tab==="Home"?<img src={home_img_active} alt="Home" /> : <img src={home_img} alt="Home" />
        }
        </Link>
      </div>
      <div className="nav-item">
        <Link to={'/tasks'} >
        {
          tab==="Tasks"?<img src={task_img_active} alt="Home" /> : <img src={task_img} alt="Home" />
        }
        </Link>
      </div>
      <div className="nav-item">
        <Link to={'/leaderboard'} >
        {
          tab==="Leaderboard"? <img src={leaderboard_img_active} alt="Home" /> : <img src={leaderboard_img} alt="Home" />
        }
        </Link>
      </div>
      <div className="nav-item">
        <Link to={'/entrycard'} >
        {
          tab==="Entry Card"?<img src={id_img_active} alt="Home" /> : <img src={id_img} alt="Home" />
        }
        </Link>
      </div>
      <div className="nav-item">
        <Link to={'/profile'} >
        {
          tab==="Profile"?<img src={profile_img_active} alt="Home" /> : <img src={profile_img} alt="Home" />
        }
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;

