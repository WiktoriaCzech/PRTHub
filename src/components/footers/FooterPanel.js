import React, {useState} from "react";
import {Alert, Divider} from "antd";
import "./FooterPanel.css";
import { ArrowLeftOutlined } from '@ant-design/icons';

import database from "./database";

function FooterPanel() {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [position, setPosition] = useState();
    const [email, setEmail] = useState();
    const [phone_number, setPhone_Number] = useState();
    const [photo, setPhoto] = useState();

    const [toggleButtonId, setToggleButtonId] = useState(null);

    const [state,setState] = useState(true);
    const [isToggled, setIsToggled] = useState(false);
    const [alertState, setAlertState] =  useState("");
    const [toggleAlert, setToggleAlert] = useState(false);

    function closeAlert() {
        setToggleAlert(false);
    }
    //show dropdown list on info
    function toggleButton(button) {
        setToggleButtonId(button.id);
        setIsToggled(!isToggled);
    }
    //switch between form/mail-info
    function switchState() {
        setState(!state);
    }
    //async fcn POST
    async function sendForm () {

        const result = await fetch (
            '',
            {
                method: 'POST',
                headers: {
                    // "Authorization" : `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name, surname, position, email, phone_number, photo
                }),
            }
        );
        // console.log(result);
        setToggleAlert(true);
        if(result.status === 201) {
            setAlertState('ok');
        }else{
            setAlertState('err');
        }
    }
    return (
        <div className="generator-wrapper">
            <h1>Generator stopek do maili</h1>
            <h2>Po wygenerowaniu, w celu dodania stopki,
                wybierz swoją <span className="mailbox-span" onClick={switchState}>pocztę </span>
                w celu wyświetlenia instrukcji.</h2>{state ? (
                    <div className="forms-with-response">{ toggleAlert ? (
                        <div className="alert-wrapper">{
                            alertState === 'ok' ? (
                                <Alert message="Pomyślnie wysłano formularz."
                                       type="success" showIcon closable onClose={closeAlert}/>
                            ): (
                                <Alert
                                    message="Error"
                                    description="Wystąpił błąd podczas przesyłania danych."
                                    type="error"
                                    showIcon closable
                                    onClose={closeAlert}
                                />
                            )
                        }
                        </div>
                    ) : (
                        <div className="shadow-wrapped">
                            <span className="dot" onClick={switchState} />
                            <span className="dot" onClick={switchState}/>
                            <span className="dot" onClick={switchState}/>
                            <form className="form-content" onSubmit={handleSubmit}>
                                <Divider className="form-title" orientation="left" orientationMargin="0">
                                    Informacje o członku zespołu</Divider>
                                <label className="name-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Imię
                    </span>
                                    <input
                                        className="input-data" type="text"
                                        placeholder="Jan"
                                        onChange={(e) => {setName(e.target.value)}}
                                        required={true} />
                                </label>
                                <label className="surname-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Nazwisko
                    </span>
                                    <input
                                        className="input-data" type="text"
                                        placeholder="Kowalski"
                                        onChange={(e) => {setSurname(e.target.value)}}
                                        required={true} />
                                </label>
                                <label className="section-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Stanowisko
                    </span>
                                    <input
                                        className="input-data" type="text"
                                        placeholder="Lider Sekcji XYZ"
                                        onChange={(e) => {setPosition(e.target.value)}}
                                        required={true} />
                                </label>
                                <label className="email-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Email
                    </span>
                                    <input
                                        className="input-data" type="email"
                                        placeholder="Jan.Kowalski@gmail.com"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        required={true} />
                                </label>
                                <label className="tel-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Numer telefonu
                    </span>
                                    <input
                                        className="input-data" type="tel"
                                        placeholder="+48 123 456 789"
                                        onChange={(e) => {setPhone_Number(e.target.value)}}
                                        required={true} />
                                </label>
                                <label className="url-field">
                    <span className="form-text">
                        <span className="req">*</span>
                        Link do zdjęcia
                    </span>
                                    <input
                                        className="input-data" type="url"
                                        placeholder="https://dysk.google/twoje-zdjecie.jpeg"
                                        onChange={(e) => {setPhoto(e.target.value)}}
                                        required={true} />
                                </label>
                                <Divider className="form-title"/>
                                <button className="send-btn"
                                        type="button"
                                        onClick={sendForm}>
                                    Wygeneruj
                                </button>
                            </form>
                        </div>
                    )
                    }
                    </div>
        ) : (
            <div className="mail-info-wrapper">
                <button className='forms-btn'
                        onClick={switchState}><ArrowLeftOutlined />Formularz</button>
                <div className="mail-list" >
                    <ul>
                        { database.map(mail => {
                                return (
                                    <div>
                                        <li className="list">
                                            <button key={mail.id}
                                                    className={isToggled ? "toggleButtonId toggled": "toggleButtonId"}
                                                    onClick={() => toggleButton(mail) }>
                                                <img src={mail.imgSrc}  alt="icon"/>
                                                <span>{mail.mailName}</span>
                                            </button>
                                        </li>
                                        <div>{ isToggled && toggleButtonId===mail.id ? (
                                            <div className="information">
                                                <ol>
                                                    <div>{mail.info.map( info => {
                                                        return (
                                                            <li>{info}</li>
                                                        )})
                                                    }</div>
                                                </ol>
                                                <Divider className="info-divider"/>
                                                <span className="more-info">Po więcej informacji kliknij
                                                    <a className="list-link" target="_blank" rel="noreferrer"
                                                       href={mail.link}> tutaj</a></span>
                                            </div>
                                        ): null
                                        }</div>
                                    </div>
                                )})
                        }
                    </ul>
                </div>
            </div>
        )
        }
        </div>
    )
}
export default FooterPanel;