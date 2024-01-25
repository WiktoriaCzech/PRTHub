import React, { useEffect, useState } from "react";
import { Statistic, Col, Card, Calendar, Row } from "antd";
import ThreeSixty from "react-360-view";

import "./CentralPanel.css";

import { ReactComponent as ArrowR } from "../images/svg/arrowRight.svg";
import { ReactComponent as ArrowL } from "../images/svg/arrowLeft.svg";
import { ReactComponent as LinkBtnGraphic } from "../images/svg/linkBtnGraphic.svg";
import { ReactComponent as CalendarGraphic } from "../images/svg/calendarGraphic.svg";

const { Countdown } = Statistic;

function CentralPanel() {
  const deadlinesArray = [
    { id: 0, deadline: new Date(`2024-08-14`), fs: "FSG" },
    { id: 1, deadline: new Date(`2024-07-18`), fs: "FSAA" },
    { id: 2, deadline: new Date(`2024-08-28`), fs: "FSCz" },
  ];

  //calendar
  const sectionArray = [
    { id: 0, section: "Konstrukcja Nośna" },
    { id: 1, section: "Elektronika" },
    { id: 2, section: "Informatyka" },
    { id: 3, section: "Silnik" },
    { id: 4, section: "Zawieszenie" },
    { id: 5, section: "Aerodynamika" },
    { id: 6, section: "Marketing" },
  ];

  const [getId, setId] = useState(0);

  const onDateChange = (selected) => {
    setId(selected.week() % 7);
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  function getSection(id) {
    const found = sectionArray.find((element) => {
      return element.id === id;
    });
    return found.section;
  }

  //timers
  const FSCounter = ({ id }) => {
    const getFSInfo = () => `Zawody ${deadlinesArray[id].fs} za`;

    return (
      <div className={`deadlineFS${id + 1} timer`}>
        <div className="timer translated">
          <Card
            size="small"
            cover={
              <Col className="counter">
                <Countdown
                  title={getFSInfo()}
                  value={deadlinesArray[id].deadline}
                  format="DD dni HH:mm:ss h"
                />
              </Col>
            }
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil(
      ((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
    );
    setId(week % 7);
  }, []);

  return (
    <div className="mainSiteWrapper">
      <div className="upperHalf">
        <div className="telegramPhotoHolder"></div>
        <div className="calendarWrapper">
          <div className="cleaningDuty">
            <span>Dzisiaj sprząta:</span>
            <span className="section">{getSection(getId)}</span>
          </div>
          <div className="calendar">
            <CalendarGraphic className="calendarGraphicPlacement" />
            <CalendarGraphic className="calendarGraphicPlacement mirrored" />
            <Calendar
              fullscreen={false}
              headerRender={({ value, onChange }) => {
                const current = value.clone();

                return (
                  <div className="calendarHeader">
                    <Row align="middle" justify="space-between">
                      <Col>
                        <button
                          className="changeMonthBtn"
                          size="small"
                          onClick={() => {
                            const newMonth = value
                              .clone()
                              .subtract(1, "months");
                            onChange(newMonth);
                          }}
                        >
                          <ArrowL />
                        </button>
                      </Col>
                      <Col>
                        <span className="displayMonth">
                          {current.format("MMMM YYYY")}
                        </span>
                      </Col>
                      <Col>
                        <button
                          className="changeMonthBtn"
                          size="small"
                          onClick={() => {
                            const newMonth = value.clone().add(1, "months");
                            onChange(newMonth);
                          }}
                        >
                          <ArrowR />
                        </button>
                      </Col>
                    </Row>
                  </div>
                );
              }}
              onPanelChange={onPanelChange}
              onSelect={onDateChange}
              onChange={onDateChange}
            />
          </div>
        </div>
      </div>
      <div className="links">
        <button className="mainLinksBtn section">
          Dokumentacja <LinkBtnGraphic className="linkBtnPlacement" />
        </button>
        <button className="mainLinksBtn section">
          Linktree PMT-06E <LinkBtnGraphic className="linkBtnPlacement" />
        </button>
        <button className="mainLinksBtn section">
          Serwer Nextcloud <LinkBtnGraphic className="linkBtnPlacement" />
        </button>
      </div>
      <div className="bottomHalf">
        <div className="timersWrapper">
          {deadlinesArray.map((deadline, index) => (
            <FSCounter key={deadline.id} id={index} />
          ))}
        </div>
        <div className="bolid360">
          <ThreeSixty
            amount={36}
            imagePath="https://przracing.pl/uploads/react360/"
            fileName="PMT04_{index}.png?aaaa"
            spinReverse
          />
        </div>
      </div>
      <div className="secretBtnPlacement">
        <button className="secretBtn">Secret ?</button>
      </div>
    </div>
  );
}
export default CentralPanel;
