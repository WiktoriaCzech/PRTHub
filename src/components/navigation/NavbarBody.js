import {Menu} from "antd";
import {DatabaseOutlined, FormOutlined, HomeOutlined, LineChartOutlined, SearchOutlined,MenuUnfoldOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import "./Navigation.css";

function NavbarBody () {
    return (
        <div className="website">
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />} to="/">
                    Strona główna
                    <Link to="/central/main-panel"/>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />} >
                    Tworzenie ofert
                    <Link to="/central/offers"/>
                </Menu.Item>
                <Menu.Item key="3" icon={<MenuUnfoldOutlined />} >
                    Tworzenie stopek
                    <Link to="/central/offers"/>
                </Menu.Item>
                <Menu.Item key="4" icon={<LineChartOutlined />} >
                    Panel Sponsorów
                    <Link to="/central/sponsorsfinall"/>
                </Menu.Item>
                <Menu.Item key="5" icon={<DatabaseOutlined />} >
                    Inteligentny Magazyn
                    <Link to="/central/intelligent-storage"/>
                </Menu.Item>
                <Menu.Item key="6" icon={<SearchOutlined />} >
                    Wyszukiwarka
                    <Link to="/central/search-bar"/>
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default NavbarBody;