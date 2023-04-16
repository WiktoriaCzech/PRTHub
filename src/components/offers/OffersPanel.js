import React, {useEffect, useState, useRef} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./OffersPanel.css";
import {Button, Divider, Form, Radio, Input, Upload} from "antd";
import {CloseOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";

let _ = require('lodash');

function OffersPanel () {

    const postalCode = /^[0-9]{2}-[0-9]{3}/;
    const nip = /^[0-9]{10}$/;

    const [howManyItems, setHowManyItems] = useState(0);
    const [toggleResetOnSmallerForms, setToggleResetOnSmallerForms] = useState(false);


    const itemsNamesRefs = useRef([]);
    const amountNamesRefs = useRef([]);
    const bruttoNamesRefs = useRef([]);
    const vatNamesRefs = useRef([]);
    const deliveryNamesRefs = useRef([]);
    const screenNamesRefs = useRef([]);

    let [validate, setValidate] = useState({
        productValid: false,
        amountValid: false,
        bruttoValid: false,
        vatValid: false,
        delivery_priceValid: false,
        screenValid: false,
    });

    // req for falsy upload from antd Upload component
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    //reset fields
    const handleReset = () => {
        formik.resetForm();
        setToggleResetOnSmallerForms(true);
    }

    const formik = useFormik({
        initialValues: {
            type: '',
            company_name: '',
            street:'',
            postal_code: '',
            city: '',
            country: '',
            NIP: '',
            items: '',
        },

        validationSchema: Yup.object({
            type: Yup.string()
                .required('To pole jest wymagane'),
            company_name: Yup.string()
                .max(50, 'Max 50 znaków')
                .required('To pole jest wymagane'),
            street: Yup.string()
                .max(20, 'Max 20 znaków')
                .required('To pole jest wymagane'),
            postal_code: Yup.string()
                .matches(postalCode, 'Kod pocztowy jest niepoprawny')
                .required("To pole jest wymagane"),
            city: Yup.string()
                .required('To pole jest wymagane'),
            country: Yup.string()
                .required( 'To pole jest wymagane'),
            NIP: Yup.string()
                .matches(nip, 'Numer NIP jest niepoprawny')
                .required( 'To pole jest wymagane'),
            // items: Yup.object({
            //     product: Yup.string().required('To pole jest wymagane'),
            //     amount: Yup.string().required('To pole jest wymagane'),
            //     brutto: Yup.string().required('To pole jest wymagane'),
            //     vat: Yup.string().required('To pole jest wymagane'),
            //     delivery_price: Yup.string().required('To pole jest wymagane'),
            //     // screen: Yup.string().required('To pole jest wymagane'),
            // })
        }),
        onSubmit: values => {
            // change first letter to upper case
            values.company_name = values.company_name.charAt(0).toUpperCase() + values.company_name.slice(1);
            values.street = values.street.charAt(0).toUpperCase() + values.street.slice(1);
            values.country = values.country.charAt(0).toUpperCase() + values.country.slice(1);
            values.city = values.city.charAt(0).toUpperCase() + values.city.slice(1);

            console.log(JSON.stringify(values, null, 2));

        },
    });

    function createArrayOnSubmit() {
            // validate = _.mapValues(validate, () => false);

            let productNamesArr = [];
            itemsNamesRefs.current.forEach(element => {
                if(element !== null) {
                //create object in array & assign value with first letter to uppercase to product name
                productNamesArr.push({
                    product: element.input.defaultValue.charAt(0).toUpperCase() + element.input.defaultValue.slice(1),
                    amount: '',
                    brutto: '',
                    vat: '',
                    delivery_price: '',
                    screen: '',
                });
                }
            });
            let i = 0;
            amountNamesRefs.current.forEach(element => {
                if(element !== null) {
                    productNamesArr[i].amount = element.input.defaultValue;
                    i++;
                }
            });
            i = 0;
            bruttoNamesRefs.current.forEach(element => {
                if(element !== null) {
                    productNamesArr[i].brutto = element.input.defaultValue;
                    i++;
                }
            });
            i = 0;
            vatNamesRefs.current.forEach(element => {
                if(element !== null) {
                    productNamesArr[i].vat = element.input.defaultValue;
                    i++;
                }
            });
            i = 0;
            deliveryNamesRefs.current.forEach(element => {
                if(element !== null) {
                    productNamesArr[i].delivery_price = element.input.defaultValue;
                    i++;
                }
            });
            i = 0;
            let fileDataToServer = {};
            screenNamesRefs.current.forEach(element => {
                if(element !== null) {
                    // create object to store full file data due to the JSON stringify issue
                    fileDataToServer = {
                        lastModified: element.fileList[0].originFileObj.lastModified,
                        name: element.fileList[0].originFileObj.name,
                        size: element.fileList[0].originFileObj.size,
                        type: element.fileList[0].originFileObj.type,
                        uid: element.fileList[0].originFileObj.uid,
                        webkitRelativePath: element.fileList[0].originFileObj.webkitRelativePath,
                    };
                    // fileDataToServer = element.fileList[0].originFileObj;
                    productNamesArr[i].screen = fileDataToServer;
                    // console.log(JSON.stringify(fileDataToServer));
                    i++;
                }
            });

            // let finalArrayToServer = {
            //     mainData: formik.values,
            //     productsNamesData: productNamesArr,
            // };
            // console.log(finalArrayToServer);

            formik.values.items = productNamesArr;
    }

    useEffect(() => {
        console.log('updated state');
        //console.log(itemsNamesRefs);


    },[howManyItems,itemsNamesRefs,amountNamesRefs, bruttoNamesRefs,vatNamesRefs,screenNamesRefs,deliveryNamesRefs]);

    return (
        <div className="offers-panel-wrapper">
            <h1 className="offers-title">Panel tworzenia dokumentów ofertowych</h1>
            <p>W tym miejscu, możliwe jest tworzenie dokumentów ofertowych
                wykorzystywanych w celu przeprowadzania zakupów w naszym zespole,
                poprzez Politechnikę Rzeszowską.</p>
            <p>Wygenerowany dokument należy wysłać na: <a href='mailto:fundraising.przracingteam@gmail.com' >
                fundraising.przracingteam@gmail.com</a></p>

            <div className="forms-with-response">
                <div className="shadow-wrapped">
                    <span className="dot"/>
                    <span className="dot"/>
                    <span className="dot"/>
                    <Form className="offer-form" onFinish={formik.handleSubmit} noValidate >
                        <Button className="clear-all-fields-btn" onClick={handleReset} >Wyczyść pola </Button>
                        <Divider className="offer-form-title" orientation="left" orientationMargin="0">
                            Szczegóły dokumentu
                        </Divider>
                        <span className="info">Wybierz rodzaj oferty jaką chcesz wygenerować,
                            pomiędzy ofertą a kontrofertą.<br/><br/></span>

                        <Form.Item label="Typ oferty:" name="offer-type" required={true} onChange={formik.handleChange} >
                            <div className="offer-type-with-response">
                                <Radio.Group  name="type">
                                    <Radio.Button value="oferta">Oferta</Radio.Button>
                                    <Radio.Button value="kontroferta1">Kontroferta I</Radio.Button>
                                    <Radio.Button value="kontroferta2">Kontroferta II</Radio.Button>
                                </Radio.Group>
                                {formik.touched.type && formik.errors.type ? (
                                    <div className="err-message">{formik.errors.type}</div>
                                ) : null}
                            </div>
                        </Form.Item>
                        <Divider className="form-title" orientation="left" orientationMargin="0">
                            Informacje o sprzedawcy
                        </Divider>
                        <span className="info">Wstaw informacje na temat sprzedawcy, u którego będzie
                            dokonywany zakup.<br/></span>
                        <br/>
                        <div className="company-data-fields">
                            <Form.Item label="Nazwa firmy:" name="company-name" required={true}>
                                <div className="company-name-with-response">
                                    <Input
                                        name="company_name"
                                        placeholder="Wyrabiacz tanich komponentów sp. z.o.o"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.company_name}
                                    />
                                    {formik.touched.company_name && formik.errors.company_name ? (
                                        <div className="err-message">{formik.errors.company_name}</div>
                                    ) : null}
                                </div>
                            </Form.Item>

                            <Form.Item label="Kod pocztowy:" name="street-number" required={true}>
                                <div className="street-number-with-response">
                                    <Input
                                        name="postal_code"
                                        placeholder="35-036"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.postal_code}
                                    />
                                    {formik.touched.postal_code && formik.errors.postal_code ? (
                                        <div className="err-message">{formik.errors.postal_code}</div>
                                    ) : null}
                                </div>
                            </Form.Item>

                            <Form.Item label="Ulica:" name="street" required={true}>
                                <div className="street-with-response">
                                    <Input
                                        name="street"
                                        placeholder="Podkarpacka 32"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.street}
                                    />
                                    {formik.touched.street && formik.errors.street ? (
                                        <div className="err-message">{formik.errors.street}</div>
                                    ) : null}
                                </div>
                            </Form.Item>

                            <Form.Item label="Miasto:" name="city" required={true}>
                                <div className="city-with-response">
                                    <Input
                                        name="city"
                                        placeholder="Rzeszów"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                    />
                                    {formik.touched.city && formik.errors.city ? (
                                        <div className="err-message">{formik.errors.city}</div>
                                    ) : null}
                                </div>
                            </Form.Item>

                            <Form.Item label="Numer NIP firmy:" name="company-NIP" required={true}>
                                <div className="NIP-with-response">
                                    <Input
                                        name="NIP"
                                        placeholder="Numer NIP składa się z 10 cyfr"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.NIP}
                                    />
                                    {formik.touched.NIP && formik.errors.NIP ? (
                                        <div className="err-message">{formik.errors.NIP}</div>
                                    ) : null}
                                </div>
                            </Form.Item>

                            <Form.Item label="Kraj:" name="country" required={true}>
                                <div className="country-with-response">
                                    <Input
                                        name="country"
                                        placeholder="Polska"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                    />
                                    {formik.touched.country && formik.errors.country ? (
                                        <div className="err-message">{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </Form.Item>
                        </div>
                        <Divider className="form-title" orientation="left" orientationMargin="0">
                            Przedmioty do oferty
                        </Divider>
                        <span className="info">Wybierz produkty które mają zostać zawarte w ofercie, a następnie uzupełnij pola.
                            Na koniec wrzuć screena np. koszyka zakupów potwierdzającego znalezienie oferty i kontroferty
                            w podanych cenach.
                        </span>

                        <div className="single-product-wrapper">
                            <Form.List name="single_product">
                                {(fields, {add, remove}) => (
                                    <div className="single-product-placing">
                                        {fields.map((field) => {
                                            if (toggleResetOnSmallerForms) {
                                                //REMOVES ALL FIELDS!!
                                                remove(fields.map(item => item.name));
                                                setHowManyItems(0);
                                                setToggleResetOnSmallerForms(false);
                                            }
                                            return (
                                                <div className="single-product" key={field.key}>
                                                    <CloseOutlined
                                                        className="remove-single-item"
                                                        onClick={() => {
                                                            remove(fields.filter(function (item) {
                                                                return item.name === field.name;

                                                            }).map(function (field) {
                                                                return field.name
                                                            }));

                                                            setHowManyItems(howManyItems - 1);

                                                        }}/>
                                                    <Form.Item required={true} label="Nazwa produktu:">
                                                        <Input
                                                            name="item.product"
                                                            ref={element => (itemsNamesRefs.current[field.name] = element)}
                                                            id={`name_${field.name}`}
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    productValid: true,
                                                                });
                                                            }}
                                                        />
                                                        {/*{formik.errors.items[field.name] && formik.errors.items[field.name].product && formik.touched.items[field.name].product ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.items[field.name].product}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>

                                                    <Form.Item required={true} label="Ilość:">
                                                        <Input
                                                            name="item.amount"
                                                            ref={element => (amountNamesRefs.current[field.name] = element)}
                                                            id={`amount_${field.name}`}
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    amountValid: true,
                                                                });
                                                            }}
                                                        />
                                                        {/*{formik.errors.item && formik.errors.item.amount && formik.touched.item.amount ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.item.amount}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>

                                                    <Form.Item required={true} label="Wartość brutto:">
                                                        <Input
                                                            name="item.brutto"
                                                            ref={element => (bruttoNamesRefs.current[field.name] = element)}
                                                            id={`brutto_${field.name}`}
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    bruttoValid: true,
                                                                });
                                                            }}
                                                        />
                                                        {/*{formik.errors.item && formik.errors.item.brutto && formik.touched.item.brutto ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.item.brutto}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>

                                                    <Form.Item required={true} label="stawka VAT:">
                                                        <Input
                                                            name="item.vat"
                                                            ref={element => (vatNamesRefs.current[field.name] = element)}
                                                            id={`vat_${field.name}`}
                                                            placeholder="Wpisz bez znaku %"
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    vatValid: true,
                                                                });
                                                            }}
                                                        />
                                                        {/*{formik.errors.item && formik.errors.item.vat && formik.touched.item.vat ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.item.vat}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>

                                                    <Form.Item required={true} label="Cena dostawy:">
                                                        <Input
                                                            name="item.delivery_price"
                                                            ref={element => (deliveryNamesRefs.current[field.name] = element)}
                                                            id={`delivery_price_${field.name}`}
                                                            placeholder="Jeśli odbierasz osobiście wpisz 0"
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    delivery_priceValid: true,
                                                                });
                                                            }}
                                                        />
                                                        {/*{formik.errors.item && formik.errors.item.delivery_price && formik.touched.item.delivery_price ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.item.delivery_price}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>

                                                    <Form.Item required={true} label="Zrzut ekranu:"
                                                               valuePropName="fileList">
                                                        <Upload
                                                            name="item.screen"
                                                            ref={element => (screenNamesRefs.current[field.name] = element)}
                                                            customRequest={dummyRequest}
                                                            id={`upload_${field.name}`}
                                                            maxCount={1}
                                                            onChange={() => {
                                                                setValidate({
                                                                    ...validate,
                                                                    screenValid: true,
                                                                });
                                                                // console.log(screenNamesRefs.current[field.name].fileList[field.name].originFileObj);
                                                            }}
                                                            listType="picture"
                                                        >
                                                            <Button className="upload-file-button"
                                                                    icon={<UploadOutlined/>}>Dodaj (Max: 1)</Button>
                                                        </Upload>
                                                        {/*{formik.errors.item && formik.errors.item.screen && formik.touched.item.screen ? (*/}
                                                        {/*    <div className="err-message">{formik.errors.item.screen}</div>*/}
                                                        {/*) : null}*/}
                                                    </Form.Item>
                                                </div>
                                            )
                                        })}
                                        <div className="add-product">
                                            <Form.Item>
                                                <Button
                                                    className="offer-btn"
                                                    type="dashed"
                                                    onClick={() => {
                                                        add();
                                                        setHowManyItems(howManyItems + 1);
                                                        //set all fields to false, non loop method -> lodash lib
                                                        validate = _.mapValues(validate, () => false);
                                                    }}
                                                    // disabled={fields.length > 0 && !Object.values(validate).every(item => item === true)}
                                                    block
                                                    icon={<PlusOutlined/>}
                                                >
                                                    Dodaj kolejny przedmiot
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                )
                                }
                            </Form.List>
                        </div>
                        <Form.Item>
                            <Button
                                type="submit"
                                htmlType="submit"
                                className="submit-btn-offer"
                                onClick={createArrayOnSubmit}
                            >
                                {" "}
                                Stwórz dokument PDF{" "}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default OffersPanel;