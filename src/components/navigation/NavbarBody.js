import {Menu} from "antd";
import {
    DatabaseOutlined, FormOutlined, HomeOutlined,
    LineChartOutlined, SearchOutlined, MenuUnfoldOutlined, CodeOutlined, SafetyCertificateOutlined, LinkOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import "./Navigation.css";

function NavbarBody () {

    return (
        <div className="website">
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="1" icon={<HomeOutlined />} >
                    Strona główna
                    <Link to="/central/main-panel"/>
                </Menu.Item>
                <Menu.Item key="2" icon={<LinkOutlined />} >
                    Ważne linki
                    <Link to="/central/shortcuts"/>
                </Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />} >
                    Tworzenie ofert
                    <Link to="/central/offers"/>
                </Menu.Item>
                <Menu.Item key="4" icon={<MenuUnfoldOutlined />} >
                    Generator stopek
                    <Link to="/central/footer"/>
                </Menu.Item>
                <Menu.Item key="5" icon={<LineChartOutlined />} >
                    Panel Sponsorów
                    <Link to="/central/sponsorsfinall"/>
                </Menu.Item>
                <Menu.Item key="6" icon={<DatabaseOutlined />} >
                    Inteligentny Magazyn
                    <Link to="/central/intelligent-storage"/>
                </Menu.Item>
                <Menu.Item key="7" icon={<SearchOutlined />} >
                    Wyszukiwarka
                    <Link to="/central/search-bar"/>
                </Menu.Item>
                <Menu.Item key="8" icon={<SafetyCertificateOutlined />} >
                    Licencje
                    <Link to="/central/certificate"/>
                </Menu.Item>
                <Menu.Item key="9" icon={<CodeOutlined />} >
                    Webhooks
                    <Link to="/central/hooks"/>
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default NavbarBody;