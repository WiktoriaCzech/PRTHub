import React, {useEffect, useState} from 'react';
import {Statistic, Col, Progress, Card, Calendar, Row, Select} from 'antd';
import "./CentralPanel.css";
import {CloudUploadOutlined} from "@ant-design/icons";

const { Countdown } = Statistic;
const seasonStartDate = new Date(`2022-10-01`);

function CentralPanel () {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const deadlinesArray = [
        {id: 0, deadline: new Date(`2023-08-14`), fs: 'FSHolland' },
        {id: 1, deadline: new Date(`2023-07-18`), fs: 'FSCzechia' },
        {id: 2, deadline: new Date(`2023-08-28`), fs: 'FSCroatia' },
    ];
    const sectionArray = [
        {   id:0, section: 'Zawieszenie'},
        {   id:1, section: 'Aerodynamika'},
        {   id:2, section: 'Marketing'},
        {   id:3, section: 'Konstrukcja Nośna'},
        {   id:4, section: 'Elektronika'},
        {   id:5, section: 'Informatyka'},
        {   id:6, section: 'Silnik'},
    ];

    const [getId, setId] = useState(0);

    const onDateChange = (selected) => {
        setId(selected.week()%7);
    }

    function getSection(id){
        const found = sectionArray.find((element) => {
            return element.id ===id;
        })
        return (
            <h3 style={{color: '#fff', marginBottom: '0'}}>{found.section}</h3>
        )
    }// displays array cell given by id prop

    function getFSInfo(id) {
        return "Do zawodów " + deadlinesArray[id].fs;
    }//displays text on counter with proper array attribute

    function timeLeft (id) {
        const allTime = deadlinesArray[id].deadline - seasonStartDate;
        const timeTillToday = new Date() - seasonStartDate;
        return Math.round(timeTillToday * 100 / allTime);
    }//returns time left in percent to the competition

    useEffect(()=>{
        let now = new Date();
        let onejan = new Date(now.getFullYear(), 0, 1);
        let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
        setId(week%7);
    },[])

    return (
        <div className="site-wrapper">
            <div className="timers-wrapper">
                <header className="timer-header">Do zawodów zostało...</header>
                <div className="deadlineFS1 timer">
                    <Card size="small"
                          cover={
                              <Col className="counter">
                                  <Countdown title={getFSInfo(0)} value={deadlinesArray[0].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#cfb8af',
                                      '50%': '#b47a62',
                                      '100%': '#99350a',
                                  }} percent={ timeLeft(0) }
                                     strokeWidth={14}/>
                              </Col>
                          }></Card>
                </div>
                <div className="deadlineFS2 timer">
                    <Card size="small"
                          cover={
                              <Col className="counter">
                                  <Countdown title={getFSInfo(1)} value={deadlinesArray[1].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#cfb8af',
                                      '50%': '#b47a62',
                                      '100%': '#99350a',
                                  }} percent={ timeLeft(1) }
                                     strokeWidth={14} />
                              </Col>
                          }></Card>
                </div>
                <div className="deadlineFS3 timer">
                    <Card size="small"
                          cover={
                              <Col className="counter">
                                  <Countdown title={getFSInfo(2)} value={deadlinesArray[2].deadline}
                                             format="DD dni HH:mm:ss godz"/>
                                  <Progress strokeColor={{
                                      '0%': '#cfb8af',
                                      '50%': '#b47a62',
                                      '100%': '#99350a',
                                  }} percent={timeLeft(2)}
                                            strokeWidth={14}/>
                              </Col>
                          }></Card>
                </div>
            </div>
            <div className="calendar-wrapper">
                <div className="calendar-position-center">
                    <div className="calendar-info-outline">
                        <div className="site-calendar-customize-header-wrapper">
                            <Calendar style={{overflow: 'hidden', display: 'block', width: '100%'}}
                                fullscreen={false}
                                headerRender={({ value, type, onChange, onTypeChange }) => {
                                    const start = 0;
                                    const end = 12;
                                    const monthOptions = [];
                                    let current = value.clone();
                                    const localeData = value.localeData();
                                    const months = [];
                                    for (let i = 0; i < 12; i++) {
                                        current = current.month(i);
                                        months.push(localeData.monthsShort(current));
                                    }
                                    for (let i = start; i < end; i++) {
                                        monthOptions.push(
                                            <Select.Option key={i} value={i} className="month-item">
                                                {months[i]}
                                            </Select.Option>,
                                        );
                                    }
                                    const year = value.year();
                                    const month = value.month();
                                    const options = [];
                                    for (let i = year - 10; i < year + 10; i += 1) {
                                        options.push(
                                            <Select.Option key={i} value={i} className="year-item">
                                                {i}
                                            </Select.Option>,
                                        );
                                    }
                                    return (
                                        <div
                                            style={{
                                                padding: 8,
                                            }}
                                        >
                                            <Row gutter={8}>
                                                <Col>
                                                    <Select
                                                        size="small"
                                                        dropdownMatchSelectWidth={true}
                                                        value={month}
                                                        onChange={(newMonth) => {
                                                            const now = value.clone().month(newMonth);
                                                            onChange(now);
                                                        }}
                                                    >
                                                        {monthOptions}
                                                    </Select>
                                                </Col>
                                                <Col>
                                                    <Select
                                                        size="small"
                                                        dropdownMatchSelectWidth={true}
                                                        className="my-year-select"
                                                        value={year}
                                                        onChange={(newYear) => {
                                                            const now = value.clone().year(newYear);
                                                            onChange(now);
                                                        }}
                                                    >
                                                        {options}
                                                    </Select>
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
                        <div className="cleaning-info">
                            <header className="cleaning-header"> Dzisiaj sprząta:</header>
                            <div className="cleaning-info-content">
                                {getSection(getId)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-links">
                    <a href="https://linktr.ee/PRzRacingTeam" className="btn-linktree btn" >Linktr.ee <CloudUploadOutlined /></a>
                    <a href="https://nextcloud.przracing.pl" className="btn-nextcloud btn" >Nextcloud <CloudUploadOutlined /></a>
                    <a href="https://docs.przracing.pl/" className="btn-docs btn" >Dokumentacja <CloudUploadOutlined /></a>
                </div>
            </div>
        </div>
    )
}
export default CentralPanel;