import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import { ReactComponent as Pointer } from "../images/svg/pointer.svg";
import "./Navigation.css";

function NavbarBody() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(1);

  const menuItemList = [
    { id: 1, title: "Strona główna", link: "home" },
    { id: 2, title: "Ważne linki", link: "links" },
    { id: 3, title: "Generator ofert", link: "offerGen" },
    { id: 4, title: "Stopki e-mail", link: "footerGen" },
    { id: 5, title: "Licencje", link: "licenses" },
  ];
  const renderIcon = (key) => {
    if (selectedItem === key) {
      return (
        <Pointer
          className="pointer-transition"
          style={{ fill: "#FF3C00", "fill-opacity": "0.7" }}
        />
      ); // selected
    } else if (hoveredItem === key) {
      return (
        <Pointer className="pointer-transition" style={{ fill: "#4F5B75" }} />
      ); // hovered
    }
    return null;
  };

  return (
    <div className="website">
      <Menu
        theme="dark"
        mode="inline"
        onSelect={({ key }) => setSelectedItem(Number(key))}
      >
        {menuItemList.map((item) => (
          <Menu.Item
            key={item.id}
            icon={renderIcon(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.title}
            <Link to={`/v1/${item.link}`} />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default NavbarBody;
