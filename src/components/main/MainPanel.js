import React from 'react';
import { useNavigate } from "react-router-dom";

import "./MainPanel.css";
import bolid from "../images/IMG_1134.png";
import bolidshadow from "../images/shadow.png";

function MainPanel () {

    let navigate = useNavigate();

    const handleClick = event => {
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
                    <img src={bolid} alt="bolid" className="bolid" />
                        <div className="relative-wrapper" >
                            <div className="box" onClick={handleClick}></div>
                        </div>
                        <div className="relative-wrapper" >
                            <div className="rectangle" onClick={handleClick}></div>
                        </div>
                        <div className="relative-wrapper" >
                            <div className="triangle" onClick={handleClick}></div>
                        </div>
                </div>
            <div className="footer">Copyright © 2023 PRzRacingTeam</div>
        </div>
    )
}
export default MainPanel;