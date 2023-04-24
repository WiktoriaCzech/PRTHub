import React from "react";
import './CertificatePanel.css';
import {Card, Col, Progress, Statistic} from "antd";

const { Countdown } = Statistic;


function CertificatePanel () {

    const expirationDateArray = [
        {id: 0, deadline: new Date(`2024-04-24`),
            refreshExpirationDate : new Date(`2023-04-24`), name: 'Domena PRz-Racing' },
        {id: 1, deadline: new Date(`2023-07-18`),
            refreshExpirationDate : new Date(`2022-10-01`), name: 'Nazwa_licencji_2' },
        {id: 2, deadline: new Date(`2023-08-28`),
            refreshExpirationDate : new Date(`2022-10-01`),name: 'Nazwa_licencji_3' },
        {id: 3, deadline: new Date(`2023-08-28`),
            refreshExpirationDate : new Date(`2022-10-01`),name: 'Nazwa_licencji_4' },
    ];

    //displays text on counter with proper array attribute
    function getFSInfo(id) {
        return "Licencja: " + expirationDateArray[id].name;
    }

    //returns time left in percent
    function timeLeft (id) {
        const allTime = expirationDateArray[id].deadline - expirationDateArray[id].refreshExpirationDate;
        const timeTillToday = new Date() - expirationDateArray[id].refreshExpirationDate;
        return Math.round(timeTillToday * 100 / allTime);
    }
    return (
        <div className="certificate-panel-wrapper">
            <div className="timers-on-licence">
                <header className="licence-header">Lista aktywnych licencji</header>
                <div className="licence">
                    <Card size="small"
                          cover={
                              <Col className="count">
                                  <Countdown className="countdown" title={getFSInfo(0)} value={expirationDateArray[0].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#bfa5a5',
                                      '50%': '#957474',
                                      '100%': '#614444',
                                  }} percent={ timeLeft(0) }
                                            strokeWidth={10}/>
                              </Col>
                          }></Card>
                </div>
                <div className="licence">
                    <Card size="small"
                          cover={
                              <Col className="count">
                                  <Countdown title={getFSInfo(1)} value={expirationDateArray[1].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#bfa5a5',
                                      '50%': '#957474',
                                      '100%': '#614444',
                                  }} percent={ timeLeft(1) }
                                            strokeWidth={10} />
                              </Col>
                          }></Card>
                </div>
                <div className="licence">
                    <Card size="small"
                          cover={
                              <Col className="count">
                                  <Countdown title={getFSInfo(2)} value={expirationDateArray[2].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#bfa5a5',
                                      '50%': '#957474',
                                      '100%': '#614444',
                                  }} percent={timeLeft(2)}
                                            strokeWidth={10}/>
                              </Col>
                          }></Card>
                </div>
                <div className="licence">
                    <Card size="small"
                          cover={
                              <Col className="count">
                                  <Countdown title={getFSInfo(3)} value={expirationDateArray[2].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#bfa5a5',
                                      '50%': '#957474',
                                      '100%': '#614444',
                                  }} percent={timeLeft(2)}
                                            strokeWidth={10}/>
                              </Col>
                          }></Card>
                </div>
            </div>
        </div>
    )
}
export default CertificatePanel;