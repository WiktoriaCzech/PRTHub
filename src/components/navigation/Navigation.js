import React, {useState} from 'react';
import {Button, Layout} from 'antd';
import {Link, useNavigate} from "react-router-dom"
import { CloseOutlined } from '@ant-design/icons';

import NavbarBody from "./NavbarBody";
import "./Navigation.css";

import light from "../images/racing-team-logo-white.png";

const { Sider } = Layout;

const Navigation = () => {

    const [sidebar, setSidebar] = useState(false);
    const [navbarOption, setNavbarOption] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    let navigate = useNavigate();

    window.addEventListener("resize", function () {
       window.matchMedia("(max-width: 810px)").matches ?
            setNavbarOption(true) : setNavbarOption(false);
    });

    function handleLogo () {
        navigate("/central/main-panel");
    }

    return (
        <div className="navbar-option" id="change-navi-bg">{ navbarOption ? (
            <>
                <Button className="barsMenu" type="primary" onClick={showSidebar}>
                    <img src={light} alt="logo-icon" className="iconMobile"/>
                </Button>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-cross">
                                <CloseOutlined />
                            </Link>
                        </li>
                        <Sider>
                            <NavbarBody />
                        </Sider>
                    </ul>
                </nav>
            </>
        ) : (
            <Sider>
                <div className="logo">
                    <img src={light} alt="logo-icon" className="icon" onClick={ handleLogo } />
                    <div className="text">PRz Racing Team</div>
                </div>
                <NavbarBody />
            </Sider>
        )
        }
        </div>
    );
}
export default Navigation;