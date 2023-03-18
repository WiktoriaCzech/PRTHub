import React, {useState} from "react";

import "./OffersPanel.css";
import {Alert, Button, Divider, Form, Radio, Input} from "antd";
import {CloseOutlined , PlusOutlined } from "@ant-design/icons";

function OffersPanel () {

    const [alertState, setAlertState] =  useState("");
    const [toggleAlert, setToggleAlert] = useState(false);

    function closeAlert() {
        setToggleAlert(false);
    }

    async function submitForm (e) {
        e.preventDefault();
        try{
            const res = await fetch(
                '',
                {
                    method: 'POST',
                    headers: {
                        // "Authorization" : `Bearer ${localStorage.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({

                    }),
            })
            setToggleAlert(true);
            if(res.status === 201) {
                setAlertState('ok');
            }else{
                setAlertState('err');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="offers-panel-wrapper">
            <h1>Panel tworzenia dokumentów ofertowych</h1>
            <span>W tym miejscu, możliwe jest tworzenie dokumentów ofertowych
                wykorzystywanych w celu przeprowadzania zakupów w naszym zespole,
                poprzez Politechnikę Rzeszowską.</span>
            <div className="forms-with-response">{
                toggleAlert ? (
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
                    <span className="dot"/>
                    <span className="dot"/>
                    <span className="dot"/>
                    <Form className="offer-form" onSubmit={submitForm}>
                        <Divider className="form-title" orientation="left" orientationMargin="0">
                            Szczegóły dokumentu
                        </Divider>
                        <span className="info">Wybierz rodzaj oferty jaką chcesz wygenerować,
                            pomiędzy ofertą a kontrofertą.<br/></span>
                            <br/>
                            <Form.Item label="Typ oferty:" name="offer-type">
                                <Radio.Group defaultValue={"O"}>
                                    <Radio.Button value="O">Oferta</Radio.Button>
                                    <Radio.Button value="K1">Kontroferta I</Radio.Button>
                                    <Radio.Button value="K2">Kontroferta II</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Divider className="form-title" orientation="left" orientationMargin="0">
                                Informacje o sprzedawcy
                            </Divider>
                        <span className="info">Wstaw informacje na temat sprzedawcy, u którego będzie
                            dokonywany zakup.<br/></span>
                            <br/>
                            <Form.Item label="Nazwa firmy:" name="company-name" required={true}>
                                <Input placeholder="Wyrabiacz tanich komponentów sp. z.o.o"/>
                            </Form.Item>

                            <Form.Item label="Ulica:" name="street" required={true}>
                                <Input placeholder="Generała Jarosława Dąbrowskiego 32"/>
                            </Form.Item>

                            <Form.Item label="Kod pocztowy:" name="street-number" required={true}>
                                <Input placeholder="35-036"/>
                            </Form.Item>

                            <Form.Item label="Miasto:" name="city" required={true}>
                                <Input placeholder="Rzeszów"/>
                            </Form.Item>

                            <Form.Item label="Kraj:" name="country" required={true}>
                                <Input placeholder="Polska"/>
                            </Form.Item>

                            <Form.Item label="Numer NIP firmy:" name="company-NIP" required={true}>
                                <Input placeholder="Numer NIP składa się z 10 cyfr"/>
                            </Form.Item>
                            <Divider className="form-title" orientation="left" orientationMargin="0">
                                Przedmioty do oferty
                            </Divider>
                            <span className="info">Wybierz produkty które mają zostać zawarte w ofercie, a następnie uzupełnij pola.
                            Na koniec wrzuć screena np.koszyka zakupów potwierdzającego znalezienie oferty i kontroferty
                                w podanych cenach.</span>

                            <Form.List name="productRequest" >
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map((field) => (
                                            <div className="single-product">
                                                <CloseOutlined  onClick={() => remove(field.name)} />
                                                <Form.Item {...field} required={true} name="productName" label="Nazwa produktu:">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item {...field} required={true} name="amount" label="Ilość:">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item {...field} required={true} name="withVAT" label="Wartość brutto:">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item {...field} required={true} name="VAT" label="stawka VAT:">
                                                    <Input placeholder="Wpisz bez znaku %"/>
                                                </Form.Item>
                                                <Form.Item {...field} required={true} name="deliveryPrice" label="Cena dostawy:">
                                                    <Input placeholder="Jeśli odbierasz osobiście wpisz 0"/>
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                                className="offer-btn"
                                            >
                                                Dodaj kolejny przedmiot
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {" "}
                                    Stwórz dokument XML{" "}
                                </Button>
                            </Form.Item>
                    </Form>
                </div>
                )
            }</div>
        </div>
    )
}
export default OffersPanel;