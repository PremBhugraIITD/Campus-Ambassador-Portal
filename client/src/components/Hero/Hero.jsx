import React, { useContext, useState, useEffect } from "react";
import "./Hero.css";
import cap_home_logo from "../../assets/Vector_cap_home.png";
import rdv_logo from "../../assets/dark/Group_rdv_logo.svg";
import { imagesContext } from "../../store/images";
import { useNavigate } from "react-router-dom";
// import { use } from "express/lib/router";

function Hero() {
  const { imageTheme } = useContext(imagesContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    setIsAuthenticated(false);
  };

  // const handleRegister = () => {
  //   window.location.href =
  //     "https://auth.rdv-iitd.org/signin?client_id=SXN8ntxQrQjyO8TyKuLxfPXmPJOPqAHe&redirect_uri=https://www.rdv-iitd.org";
  // };
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      window.location.href =
        "https://auth.rdv-iitd.org/authorise?client_id=4D97tr48z1RD4Nit2IV8wQcy60THlcwb&redirect_uri=https://cap.rdv-iitd.org";
    }
  };
  useEffect(() => {
    const checkAccessTokenAndSendRequest = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/check_user`,
        {
          method: "GET",
        }
      );
      setIsAuthenticated(response.status === 200);
    };

    checkAccessTokenAndSendRequest();
  }, []);
  return (
    <div className="home-container">
      <div className="up-home"></div>
      <img className="logo" loading="lazy" src={imageTheme.rdv_logo} alt="" />
      <img className="guitar" src={cap_home_logo} alt="" />
      <div className="down-home">
        <div className="content">
          <h1>CAMPUS AMBASSADOR PROGRAMME</h1>
          <p style={{ fontFamily: "Open Sans" }}>
            🚀 Unleash Your Inner Leader with Rendezvous '24! 🚀 Got the drive
            to lead and the passion to make waves? 🌊 Here’s your chance to
            become the face of IIT Delhi’s biggest cultural
            extravaganza—Rendezvous '24!
          </p>
          <button onClick={handleLogin}>
            {" "}
            {isAuthenticated ? "GO TO PROFILE" : "SIGN IN"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
