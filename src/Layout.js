import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";

import Navigation from "./components/navigation/Navigation";

import CentralPanel from "./components/centralPanel/CentralPanel";
import FooterPanel from "./components/footers/FooterPanel";
import OffersPanel from "./components/offers/OffersPanel";
import CertificatePanel from "./components/licenses/CertificatePanel";
import ShortcutsPanel from "./components/shortcuts/ShortcutsPanel";

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
