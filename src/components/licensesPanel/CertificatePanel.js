import React, { useState } from "react";
import "./CertificatePanel.css";
import { Card, Col, Statistic, Input } from "antd";

import { ReactComponent as SearchSVG } from "../images/svg/search.svg";

const { Search } = Input;
const { Countdown } = Statistic;

function CertificatePanel() {
  const [searchTerm, setSearchTerm] = useState("");

  const expirationDateArray = [
    {
      id: 0,
      deadline: new Date(`2024-04-24`),
      refreshExpirationDate: new Date(`2023-04-24`),
      name: "Domena PRz-Racing",
    },
    {
      id: 1,
      deadline: new Date(`2023-07-18`),
      refreshExpirationDate: new Date(`2022-10-01`),
      name: "Nazwa_licencji_2",
    },
  ];

  const LicenseCounter = ({ id }) => {
    const getInfo = () => expirationDateArray[id].name;

    return (
      <div className={`deadline${id + 1} timer`}>
        <div className="timer translated">
          <Card
            size="small"
            cover={
              <Col className="counter">
                <Countdown
                  title={getInfo()}
                  value={expirationDateArray[id].deadline}
                  format="DD dni HH:mm:ss h"
                />
              </Col>
            }
          />
        </div>
      </div>
    );
  };

  const filteredArray = expirationDateArray.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="licensesWrapper">
      <span className="licenceHeader">Aktywne licencje</span>
      <span className="licenceInfo">
        Wyświetlany jest pozostały czas ważności danych licencji
      </span>
      <div className="searchBarWrapper">
        <SearchSVG className="searchSVG" />
        <Search
          placeholder="Wyszukaj po nazwie"
          allowClear
          onChange={handleSearchChange}
          className="searchBar"
        />
      </div>
      <div className="licence">
        {filteredArray.map((deadline) => (
          <LicenseCounter key={deadline.id} id={deadline.id} />
        ))}
      </div>
    </div>
  );
}
export default CertificatePanel;
