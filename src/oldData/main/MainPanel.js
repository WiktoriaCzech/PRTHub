import React from 'react';
import { useNavigate } from "react-router-dom";

import "./MainPanel.css";
import bolid from "../images/IMG_1134.webp";
import bolidshadow from "../images/shadow.webp";

function MainPanel () {

    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="main-site-wrapper">
            <button className="sign-in" onClick={handleClick}>Sign in</button>
            <div className="about-wrapper">
                <h1 className='about'>
                    <div className="correction">
                        <span className="skn">PRz</span>
                        <span className="skn-f">Racing</span>
                        <div className="final-correction">
                            <span className="skn-f">Team</span>
                        </div>
                    </div>
                    <span className="rest">Integrated</span>
                    <span className="rest">Management</span>
                    <span className="rest">System</span>
                </h1>
            </div>
                <div className="bolid-shadow-wrapper">
                    <img src={bolidshadow} alt="bolid shadow" className="bolid-shadow"/>
                </div>
                <div className="bolid-wrapper">
                        <div className="relative-wrapper" >
                            <div id="bounce" className="box" onClick={handleClick}></div>
                            <div id="bounce" className="rectangle" onClick={handleClick}></div>
                            <div id="bounce" className="triangle" onClick={handleClick}></div>
                            <img id="bolid" src={bolid} alt="bolid" className="bolid" />
                        </div>
                </div>
            <div className="footer">Copyright © 2023 PRzRacingTeam</div>
        </div>
    )
}
export default MainPanel;