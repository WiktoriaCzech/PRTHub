import Navigation from "./components/navigation/Navigation";
import {Breadcrumb, Layout} from "antd";
import {Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import CentralPanel from "./components/centralPanel/CentralPanel";

const {Content, Footer} = Layout;

function BaseLayout () {
    let navigate = useNavigate();

    const handleLogout = () => {
        navigate('/main');
    };

    return (
        <Layout>
            <div className="menuCon">
                <Navigation/>
            </div>
            <Layout className="site-layout">
                <Content>
                    <div className="site-layout-top">
                        <Breadcrumb>
                            <Breadcrumb.Item>PRz-Racing-Team</Breadcrumb.Item>
                            <Routes>
                                <Route path="/main-panel" element={
                                    <Breadcrumb.Item>Strona Główna</Breadcrumb.Item>
                                }/>
                                <Route path="/offers" element={
                                    <Breadcrumb.Item>Tworzenie Ofert</Breadcrumb.Item>
                                }/>
                                <Route path="/sponsorsfinall" element={
                                    <Breadcrumb.Item>Panel Sponsorów</Breadcrumb.Item>
                                }/>
                                <Route path="/intelligent-storage" element={
                                    <Breadcrumb.Item>Inteligentny Magazyn</Breadcrumb.Item>
                                }/>
                                <Route path="/search-bar" element={
                                    <Breadcrumb.Item>Wyszukiwarka</Breadcrumb.Item>
                                }/>
                            </Routes>
                        </Breadcrumb>
                        <button type="button" className="logout-button" onClick={handleLogout}>Wyloguj się</button>
                    </div>
                    <div className="site-layout-background">
                        <Routes>
                            <Route path="/main-panel" element={<CentralPanel />} />
                            {/*<Route path="/offers" element={<CentralPanel />} />*/}
                            {/*<Route path="/sponsorsfinall" element={<CentralPanel />} />*/}
                            {/*<Route path="/intelligent-storage" element={<CentralPanel />} />*/}
                            {/*<Route path="/search-bar" element={<CentralPanel />} />*/}
                        </Routes>
                    </div>
                </Content>
                <Footer>PRz-Racing Team ©2022</Footer>
            </Layout>
        </Layout>
    )
}
export default BaseLayout;