import React, {useState} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Divider} from "antd";
import "./FooterPanel.css";
import {ArrowLeftOutlined} from '@ant-design/icons';

import database from "./database";
import GenerateFooter from "./generator";

function FooterPanel() {

    const [toggleButtonId, setToggleButtonId] = useState(null);

    const [state, setState] = useState(true);
    const [isToggled, setIsToggled] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const [saveData, setSaveData] = useState({});

    //show dropdown list on info
    function toggleButton(button) {
        setToggleButtonId(button.id);
        setIsToggled(!isToggled);
    }

    //switch between form/mail-info
    function switchState() {
        setState(!state);
    }
    function getBackToForm () {
        setShowFooter(false);
    }

    const phoneRegExp = /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/;

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            position:'',
            email: '',
            phone_number: '',
            photo: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Max 15 znaków')
                .required('To pole jest wymagane'),
            surname: Yup.string()
                .max(20, 'Max 20 znaków')
                .required('To pole jest wymagane'),
            position: Yup.string()
                .max(50, 'Max 50 znaków')
                .required("To pole jest wymagane"),
            email: Yup.string().email('Adress email jest niepoprawny')
                .required('To pole jest wymagane'),
            phone_number: Yup.string()
                .matches(phoneRegExp, 'Numer telefonu jest niepoprawny')
                .required( 'To pole jest wymagane'),
            photo: Yup.string().required( 'To pole jest wymagane'),
        }),
        onSubmit: values => {

            setSaveData(values);
            setShowFooter(true);
        },
    });

    return (
        <div className="generator-wrapper">
            <h1>Generator stopek do maili</h1>
            <h2>W celu dodania stopki do swojej poczty, zaznacz wygenerowany dokument i <span className="bold">skopiuj go</span>.</h2>
            <h2>Następnie możesz po prostu wkleić ją do wiadomości lub zmienić ustawienia swojej poczty,
                żeby stopka była dołączana do każdej wiadomości.</h2>
            <h2>W celu wyświetlenia instrukcji jak zmienić ustawienia poczty kliknij
                <span className="mailbox-span" onClick={switchState}> Tutaj</span>
            </h2>{state ? (
                <div className="forms-with-response">
                    {showFooter ? (
                        <div className="generated-footer">
                            <button className='forms-btn'
                                    onClick={getBackToForm}><ArrowLeftOutlined/>Formularz
                            </button>
                            <Divider/>
                            <div className="generated-footer-wrapper">
                                <GenerateFooter data={saveData} />
                            </div>
                            <Divider />
                        </div>
                    ) : (
                            <div className="shadow-wrapped">
                                <span className="dot" onClick={switchState}/>
                                <span className="dot" onClick={switchState}/>
                                <span className="dot" onClick={switchState}/>
                                <form className="form-content" onSubmit={formik.handleSubmit} noValidate>
                                    <Divider className="form-title" orientation="left" orientationMargin="0">
                                        Informacje o członku zespołu
                                    </Divider>
                                    <div className="name-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Imię
                                        </label>
                                        <input
                                            className="input-data"
                                            type="text"
                                            name="name"
                                            placeholder="Jan"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="err-message">{formik.errors.name}</div>
                                        ) : null}
                                    </div>

                                    <div className="surname-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Nazwisko
                                        </label>
                                        <input
                                            className="input-data"
                                            type="text"
                                            name="surname"
                                            placeholder="Kowalski"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.surname}
                                        />
                                        {formik.touched.surname && formik.errors.surname ? (
                                            <div className="err-message">{formik.errors.surname}</div>
                                        ) : null}
                                    </div>

                                    <div className="section-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Stanowisko
                                        </label>
                                        <input
                                            className="input-data"
                                            name="position"
                                            type="text"
                                            placeholder="Lider Sekcji XYZ"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.position}
                                        />
                                        {formik.touched.position && formik.errors.position ? (
                                            <div className="err-message">{formik.errors.position}</div>
                                        ) : null}
                                    </div>

                                    <div className="email-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Email
                                        </label>
                                        <input
                                            className="input-data"
                                            name="email"
                                            type="email"
                                            placeholder="Jan.Kowalski@gmail.com"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="err-message">{formik.errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className="tel-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Numer telefonu
                                        </label>
                                        <input
                                            className="input-data"
                                            name="phone_number"
                                            type="tel"
                                            placeholder="+48 123 456 789"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone_number}
                                        />
                                        {formik.touched.phone_number && formik.errors.phone_number ? (
                                            <div className="err-message">{formik.errors.phone_number}</div>
                                        ) : null}
                                    </div>

                                    <div className="url-field">
                                        <label className="form-text">
                                            <span className="req">*</span>
                                            Link do zdjęcia
                                        </label>
                                        <input
                                            className="input-data"
                                            name="photo"
                                            type="url"
                                            placeholder="https://dysk.google/twoje-zdjecie.jpeg"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.photo}
                                        />
                                        {formik.touched.photo && formik.errors.photo ? (
                                            <div className="err-message">{formik.errors.photo}</div>
                                        ) : null}
                                    </div>

                                    <Divider className="form-title"/>
                                    <button className="send-btn" type="submit">Wygeneruj</button>
                                </form>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className="mail-info-wrapper">
                    <button className='forms-btn'
                            onClick={switchState}><ArrowLeftOutlined/>Formularz
                    </button>
                    <div className="mail-list">
                        <ul>
                            {database.map(mail => {
                                return (
                                    <div>
                                        <li className="list">
                                            <button key={mail.id}
                                                    className={isToggled ? "toggleButtonId toggled" : "toggleButtonId"}
                                                    onClick={() => toggleButton(mail)}>
                                                <img src={mail.imgSrc} alt="icon"/>
                                                <span>{mail.mailName}</span>
                                            </button>
                                        </li>
                                        <div>{isToggled && toggleButtonId === mail.id ? (
                                            <div className="information">
                                                <ol>
                                                    <div>{mail.info.map(info => {
                                                        return (
                                                            <li>{info}</li>
                                                        )
                                                    })
                                                    }</div>
                                                </ol>
                                                <Divider className="info-divider"/>
                                                <span className="more-info">Po więcej informacji kliknij
                                                        <a className="list-link" target="_blank" rel="noreferrer"
                                                           href={mail.link}> tutaj</a></span>
                                            </div>
                                        ) : null
                                        }</div>
                                    </div>
                                )
                            })
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