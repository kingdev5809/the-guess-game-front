import React, { useState } from "react";
import "./Navbar.scss";
import userLogo from "../Assets/default_pp.png";
import { NavLink } from "react-router-dom";
function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  let userData = JSON.parse(localStorage.getItem("userData"));

  const handleLoglout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <h2>Guessing game</h2>
        <ul className="menu">
          <NavLink to={"/game"} className="menu-item">
            <div className="icon">
              <i aria-hidden="true" className="ti ti-device-gamepad-2"></i>
            </div>
            <span>Game</span>
          </NavLink>
          <NavLink to={"/liderboard"} className="menu-item">
            <div className="icon">
              <i aria-hidden="true" className="ti ti-star-filled"></i>
            </div>
            <span>Liderboard</span>
          </NavLink>
          <div className="user">
            <div className="avatar" onClick={() => setDropdown(!dropdown)}>
              <img src={userLogo} alt="" />
              <p>KING</p>
            </div>

            <div className={`info ${dropdown ? "show " : ""}`}>
              <p className="account-id">{userData.email}</p>
              <NavLink to={"/profile"} onClick={() => setDropdown(false)}>
                <p className="setting">Profile</p>
              </NavLink>
              <p className="logout" onClick={handleLoglout}>
                Log out
              </p>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
