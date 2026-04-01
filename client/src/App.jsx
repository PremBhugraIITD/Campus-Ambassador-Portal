import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Tasks from "./pages/Tasks/Tasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Query from "./pages/Query/Query";
import EntryCard from "./pages/EntryCard/EntryCard";
import Profile from "./pages/Profile/Profile";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
// import rdv_logo  from './assets/white_logo.svg'
// import rdv_logo_dark from "./assets/dark_logo.svg";
// import rdv_logo_light from "./assets/white_logo.svg";

import "../src/styles/theme.css";
import { capContext } from "./store/store";
import { imagesContext } from "./store/images";
import HeaderAuth from "./components/HeaderAuth/HeaderAuth";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    const pathToTitleMap = {
      "/": "Campus Ambassador Program | Rendezvous'24 - IIT Delhi",
      "/tasks": "Tasks | Rendezvous'24 - IIT Delhi",
      "/leaderboard": "Leaderboard | Rendezvous'24 - IIT Delhi",
      "/query": "Query | Rendezvous'24 - IIT Delhi",
      "/entrycard": "Entry Card | Rendezvous'24 - IIT Delhi",
      "/profile": "Profile | Rendezvous'24 - IIT Delhi",
    };

    const currentTitle = pathToTitleMap[location.pathname] || "Home";
    document.title = currentTitle;
  }, [location.pathname]);

  const { users, tasks, user, message, setMessage } = useContext(capContext);

  const [homeClass, setHomeClass] = useState(["footerClass", "headerClass"]);
  const route = useLocation();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAccessTokenAndSendRequest = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/check_user`,
        {
          method: "GET",
        }
      );
      setIsAuth(response.status === 200);
    };

    checkAccessTokenAndSendRequest();
  }, []);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  useEffect(() => {
    if (route.pathname === "/") {
      setHomeClass(["homeFooterClass", "homeHeaderClass", "homeSideClass"]);
    } else {
      setHomeClass(["footerClass", "headerClass", "sideClass"]);
    }
    // console.log(homeClass[0]);
  }, [route]);

  const { isDarkMode, onButtonClick } = useContext(imagesContext);
  return (
    <>
      <div className="bottomNavBar">
        {isAuth ? <BottomNavBar /> : <></>}
      </div>
      <div className={`popup-message ${message ? "show" : ""}`}>
        <h4 style={{ color: "yellow" }}>
          Message:{" "}
          <span style={{ color: "white", fontWeight: "400" }}>{message}</span>
        </h4>
      </div>
      {/* <button
        style={{ position: "absolute", zIndex: "2", right: "0" }}
        onClick={onButtonClick}
      >
        change theme
      </button> */}
      <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="all-content">
          <div className={homeClass[1]}>
            {isAuth ? <Header /> : <HeaderAuth />}
          </div>
          <div className="content-container">
            <div className={homeClass[2]}></div>
            <div className="inner-content-container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                {isAuth ? (
                  <>
                    <Route path="/tasks" element={<Tasks />}></Route>
                    <Route
                      path="/leaderboard"
                      element={<Leaderboard />}
                    ></Route>
                    <Route path="/query" element={<Query />}></Route>/
                    <Route path="/entrycard" element={<EntryCard />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                  </>
                ) : (
                  <Route path="/*" element={<Navigate to="/"/>}></Route>
                )}
              </Routes>
              <div className={homeClass[0]}>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
