import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";

import Navigation from "./components/navigation/Navigation";

import CentralPanel from "./components/homePanel/CentralPanel";
import FooterPanel from "./components/footerGenPanel/FooterPanel";
import OffersPanel from "./components/offersPanel/OffersPanel";
import CertificatePanel from "./components/licensesPanel/CertificatePanel";
import ShortcutsPanel from "./components/shortcutsPanel/ShortcutsPanel";

const { Content } = Layout;

function BaseLayout() {
  return (
    <Layout>
      <div className="menuCon">
        <Navigation />
      </div>
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background">
            <Routes>
              <Route path="/" element={<Navigate replace to="/v1/home" />} />
              <Route path="/home" element={<CentralPanel />} />
              <Route path="/offerGen" element={<OffersPanel />} />
              <Route path="/footerGen" element={<FooterPanel />} />
              <Route path="/licenses" element={<CertificatePanel />} />
              <Route path="/links" element={<ShortcutsPanel />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default BaseLayout;
