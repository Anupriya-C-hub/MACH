import React from "react";
import { Link } from "react-router-dom";
import executiveImage from "../assets/executiveSummary.png";
import talentImage from "../assets/talentFinder.png";
import smeImage from "../assets/sme.png";
import replacementImage from "../assets/replacementFinder.png";
import comparisionImage from "../assets/comparisionAnalysis.png";
import skillImage from "../assets/employeeSkill.png";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/wallapper.jfif"; // Import your background image
 
function Main() {
 
  const containerStyle = {
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '500px', // Adjust height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  };
 
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // White overlay with 50% opacity
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
 
  return (
    <>
    <header>
      <img src={logo} alt="logo" />
      <nav>
        <ul className="menu">
          <li>
            <Link to="/Components/executiesummary">Executive Summary</Link>
          </li>
          <li>
            <Link to="/Components/talentfinder">Talent Finder</Link>
          </li>
          <li>
            <Link to="/Components/sme">SME</Link>
          </li>
          <li>
            <Link to="/Components/replacement">Replacement Finder</Link>
          </li>
          <li>
            <Link to="/Components/comparisionanalysis">Comparision Analysis</Link>
          </li>
          <li>
            <Link to="/Components/employeeskill">Employee Skill</Link>
          </li>
        </ul>
      </nav>
    </header>
      <div style={containerStyle}>
        <div style={overlayStyle}>
        <Link to="/Components/replacement" style={{ textDecoration: 'none' }}>
        </Link><br/>
            <Link to="/Components/comparisionanalysis" style={{ textDecoration: 'none' }}></Link><br/>
            <Link to="/Components/employeeskill" style={{ textDecoration: 'none' }}></Link>
          <h1 class="heading">MACH</h1>
             <Link to="/Components/executiesummary" style={{ textDecoration: 'none' }}></Link>
             <Link to="/Components/talentfinder" style={{ textDecoration: 'none' }}></Link>
             <Link to="/Components/sme" style={{ textDecoration: 'none' }}></Link>
        </div>
      </div>
     
    </>
  );
}
 
export default Main;