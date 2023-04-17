import Navigation from "./components/navigation/Navigation";
import {Breadcrumb, Layout} from "antd";
import {Route, Routes, useNavigate} from "react-router-dom";
import React from "react";

import CentralPanel from "./components/centralPanel/CentralPanel";
import SponsorsPanel from "./components/sponsorsPanel/SponsorsPanel";
import FooterPanel from "./components/footers/FooterPanel";
import OffersPanel from "./components/offers/OffersPanel";
import CertificatePanel from "./components/licenses/CertificatePanel";

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
                                <Route path="/footer" element={
                                    <Breadcrumb.Item>Generator Stopek</Breadcrumb.Item>
                                }/>
                                <Route path="/sponsorsfinall" element={
                                    <Breadcrumb.Item>Panel Sponsorów</Breadcrumb.Item>
                                }/>S
                                <Route path="/intelligent-storage" element={
                                    <Breadcrumb.Item>Inteligentny Magazyn</Breadcrumb.Item>
                                }/>
                                <Route path="/search-bar" element={
                                    <Breadcrumb.Item>Wyszukiwarka</Breadcrumb.Item>
                                }/>
                                <Route path="/certificate" element={
                                    <Breadcrumb.Item>Webhooks</Breadcrumb.Item>
                                }/>
                                <Route path="/hooks" element={
                                    <Breadcrumb.Item>Webhooks</Breadcrumb.Item>
                                }/>
                            </Routes>
                        </Breadcrumb>
                        <button type="button" className="logout-button" onClick={handleLogout}>Wyloguj się</button>
                    </div>
                    <div className="site-layout-background">
                        <Routes>
                            <Route path="/main-panel" element={<CentralPanel />} />
                            <Route path="/offers" element={<OffersPanel />} />
                            <Route path="/footer" element={<FooterPanel />} />
                            <Route path="/sponsorsfinall" element={<SponsorsPanel />} />
                            {/*<Route path="/intelligent-storage" element={<CentralPanel />} />*/}
                            {/*<Route path="/search-bar" element={<CentralPanel />} />*/}
                            <Route path="/certificate" element={<CertificatePanel />} />
                            {/*<Route path="/hooks" element={<CentralPanel />} />*/}
                        </Routes>
                    </div>
                </Content>
                <Footer>© 2023 PRz-Racing Team</Footer>
            </Layout>
        </Layout>
    )
}
export default BaseLayout;