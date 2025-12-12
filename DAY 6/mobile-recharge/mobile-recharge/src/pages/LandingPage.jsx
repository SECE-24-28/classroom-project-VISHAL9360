import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <section className="hero">
          <h1>Recharge Instantly</h1>
          <p>Fast, secure, and reliable mobile recharges at your fingertips.</p>
          <button className="cta-btn">Get Started</button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
