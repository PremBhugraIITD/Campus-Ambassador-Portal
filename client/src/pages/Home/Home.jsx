import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero.jsx";
import About from "../../components/About/About.jsx";
import Stats from "../../components/Stats/Stats.jsx";
import Incentives from "../../components/Incentives/Incentives.jsx";
import Roles from "../../components/Roles/Roles.jsx";
import FAQ from "../../components/FAQ/FAQ.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Hero/>
      <About />
      <Stats />
      <Incentives />
      <Roles />
      <FAQ />
      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
