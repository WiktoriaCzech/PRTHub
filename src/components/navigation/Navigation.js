import React, { useState } from "react";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

import NavbarBody from "./NavbarBody";
import "./Navigation.css";

import { ReactComponent as LogoWhite } from "../images/svg/logoPRzRTWhite.svg";
import { ReactComponent as Underline } from "../images/svg/underline.svg";

const { Sider } = Layout;
const currentTime = new Date();
let currentYear = currentTime.getFullYear();

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const [navbarOption, setNavbarOption] = useState(
    window.innerWidth <= 900 ? true : false
  );
  //TODO: on initialization get window width and set it to usestate //DONE: check if workee
  const showSidebar = () => setSidebar(!sidebar);

  let navigate = useNavigate();

  window.addEventListener("resize", function () {
    window.matchMedia("(max-width: 900px)").matches
      ? setNavbarOption(true)
      : setNavbarOption(false);
  });

  function handleLogo() {
    navigate("/v1/home");
  }
  function handleLogout() {
    navigate("/");
    //TODO: Remove login session
  }

  //First half is responsible for mobile view, change according to Figma guidelines
  return (
    <div className="navbar-option" id="change-navi-bg">
      {navbarOption ? (
        <>
          <Button className="barsMenu" type="primary" onClick={showSidebar}>
            {/* <img src={LogoWhite} alt="logo-icon" className="iconMobile" /> */}
            <LogoWhite />
          </Button>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-cross">
                  <CloseOutlined />
                </Link>
              </li>
              <Sider>
                <div className="logo" onClick={handleLogo}>
                  <LogoWhite />
                </div>
                <Underline />
                <NavbarBody />
                <button
                  className={sidebar ? "logoutBtn mobileViewBtn" : "logoutBtn"}
                  onClick={handleLogout}
                >
                  Wyloguj się
                </button>
                <footer
                  className={
                    sidebar ? "footerBasic mobileViewFtr" : "footerBasic"
                  }
                >
                  Prz Racing Team © Copyright {currentYear}
                </footer>
              </Sider>
            </ul>
          </nav>
        </>
      ) : (
        <Sider>
          <div className="logo" onClick={handleLogo}>
            <LogoWhite />
          </div>
          <Underline />
          <NavbarBody />
          <button className="logoutBtn" onClick={handleLogout}>
            Wyloguj się
          </button>
          <footer className="footerBasic">
            Prz Racing Team © Copyright {currentYear}
          </footer>
        </Sider>
      )}
    </div>
  );
};
export default Navigation;
