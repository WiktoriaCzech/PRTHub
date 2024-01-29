import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./OffersPanel.css";
import { Button, Divider, Form, Radio, Input, Upload } from "antd";
import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

import { ReactComponent as FormGraphic } from "../images/svg/calendarGraphic.svg";
import { ReactComponent as RemoveItemBtn } from "../images/svg/xIconBold.svg";

function OffersPanel() {
  const postalCode = /^[0-9]{2}-[0-9]{3}/;
  const nip = /^[0-9]{10}$/;

  const [howManyItems, setHowManyItems] = useState(0);
  const [toggleResetOnSmallerForms, setToggleResetOnSmallerForms] =
    useState(false);
  const [errorArray, setErrorArray] = useState([]);

  const itemsNamesRefs = useRef([]);
  const amountNamesRefs = useRef([]);
  const bruttoNamesRefs = useRef([]);
  const vatNamesRefs = useRef([]);
  const deliveryNamesRefs = useRef([]);
  const screenNamesRefs = useRef([]);

  // req for falsy upload from antd Upload component
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      company_name: "",
      street: "",
      postal_code: "",
      city: "",
      country: "",
      NIP: "",
      items: "",
    },

    validationSchema: Yup.object({
      type: Yup.string().required("To pole jest wymagane"),
      company_name: Yup.string()
        .max(50, "Max 50 znaków")
        .required("To pole jest wymagane"),
      street: Yup.string()
        .max(20, "Max 20 znaków")
        .required("To pole jest wymagane"),
      postal_code: Yup.string()
        .matches(postalCode, "Kod pocztowy jest niepoprawny")
        .required("To pole jest wymagane"),
      city: Yup.string().required("To pole jest wymagane"),
      country: Yup.string().required("To pole jest wymagane"),
      NIP: Yup.string()
        .matches(nip, "Numer NIP jest niepoprawny")
        .required("To pole jest wymagane"),
      items: Yup.array().required(),
    }),
    onSubmit: async (values) => {
      // change first letter to upper case
      values.company_name =
        values.company_name.charAt(0).toUpperCase() +
        values.company_name.slice(1);
      values.street =
        values.street.charAt(0).toUpperCase() + values.street.slice(1);
      values.country =
        values.country.charAt(0).toUpperCase() + values.country.slice(1);
      values.city = values.city.charAt(0).toUpperCase() + values.city.slice(1);

      console.log(JSON.stringify(values, null, 2));
    },
  });
  const onlyNumbers = /^(\s*|\d+)$/;
  const numbersWithDecimal = /^[0-9]*([,.][0-9]{0,2})?$/;

  const itemSchema = Yup.object().shape({
    product: Yup.string().required("A_To pole jest wymagane"),
    amount: Yup.string()
      .matches(onlyNumbers, "B_Wprowadź liczbę całkowitą")
      .max(20, "B_Max 20 znaków")
      .required("B_To pole jest wymagane"),
    brutto: Yup.string()
      .matches(numbersWithDecimal, "C_Wprowadź liczbę")
      .max(30, "C_Max 30 znaków")
      .required("C_To pole jest wymagane"),
    vat: Yup.string()
      .matches(numbersWithDecimal, "D_Wprowadź liczbę")
      .max(15, "D_Max 15 znaków")
      .required("D_To pole jest wymagane"),
    delivery_price: Yup.string()
      .matches(numbersWithDecimal, "E_Wprowadź liczbę")
      .max(30, "E_Max 30 znaków")
      .required("E_To pole jest wymagane"),
    screen: Yup.object().typeError("F_To pole jest wymagane"),
  });

  async function createArrayOnSubmit() {
    let productNamesArr = [];
    itemsNamesRefs.current.forEach((element) => {
      if (element !== null) {
        //create object in array & assign value with first letter to uppercase to product name
        productNamesArr.push({
          product:
            element.input.defaultValue.charAt(0).toUpperCase() +
            element.input.defaultValue.slice(1),
          amount: "",
          brutto: "",
          vat: "",
          delivery_price: "",
          screen: "",
        });
      }
    });
    let i = 0;
    amountNamesRefs.current.forEach((element) => {
      if (element !== null) {
        productNamesArr[i].amount = element.input.defaultValue;
        i++;
      }
    });
    i = 0;
    bruttoNamesRefs.current.forEach((element) => {
      if (element !== null) {
        productNamesArr[i].brutto = element.input.defaultValue;
        i++;
      }
    });
    i = 0;
    vatNamesRefs.current.forEach((element) => {
      if (element !== null) {
        productNamesArr[i].vat = element.input.defaultValue;
        i++;
      }
    });
    i = 0;
    deliveryNamesRefs.current.forEach((element) => {
      if (element !== null) {
        productNamesArr[i].delivery_price = element.input.defaultValue;
        i++;
      }
    });
    i = 0;
    let fileDataToServer = {};
    screenNamesRefs.current.forEach((element) => {
      if (element !== null && element.fileList.length !== 0) {
        // create object to store full file data due to the JSON stringify issue on files
        fileDataToServer = {
          lastModified: element.fileList[0].originFileObj.lastModified,
          name: element.fileList[0].originFileObj.name,
          size: element.fileList[0].originFileObj.size,
          type: element.fileList[0].originFileObj.type,
          uid: element.fileList[0].originFileObj.uid,
          webkitRelativePath:
            element.fileList[0].originFileObj.webkitRelativePath,
        };
        // fileDataToServer = element.fileList[0].originFileObj;
        productNamesArr[i].screen = fileDataToServer;
        // console.log(JSON.stringify(fileDataToServer));
        i++;
      } else {
        i++;
      }
    });

    // let isValidArray = [];
    // for (const element of productNamesArr) {
    //     isValidArray.push(await itemSchema.isValid(element));
    //    // console.log(element);
    // }
    // console.log(isValidArray);

    let isValidArray = [];
    let errorArrayForSingleItem = [];

    for (const element of productNamesArr) {
      itemSchema
        .validate(element, { abortEarly: false })
        .then(() => {
          isValidArray.push(true);
        })
        .catch((err) => {
          isValidArray.push(false);
          errorArrayForSingleItem.push({ errors: err.errors });
        });
    }
    setErrorArray(errorArrayForSingleItem);
    //check if all items are valid
    if (isValidArray.every((element) => element === true)) {
      formik.values.items = productNamesArr;
    } else {
      formik.values.items = "";
    }
  }

  useEffect(() => {
    // console.log('updated state');
  }, [
    howManyItems,
    itemsNamesRefs,
    amountNamesRefs,
    bruttoNamesRefs,
    vatNamesRefs,
    screenNamesRefs,
    deliveryNamesRefs,
    toggleResetOnSmallerForms,
  ]);

  return (
    <div className="offersPanelWrapper">
      <div className="infoSectionWrapper">
        <div className="infoAboutOffersGen">
          <h1 className="offersTitle">Tworzenie dokumentów ofertowych</h1>
          <span>Robisz zakupy w internecie ?</span>
          <span>Chcesz żeby Politechnika zwróciła ci środki?</span>
          <span>
            Uzupełnij podany formularz i prześlij wygenerowany dokument na:
            {
              <a
                className="textHighlited"
                href="mailto:fundraising.przracingteam@gmail.com"
              >
                {" "}
                fundraising.przracingteam@gmail.com
              </a>
            }
          </span>
        </div>
        <div className="sendOfferInfo">
          <h1>Jak wysłać ofertę?</h1>
          <span>Kliknij w przycisk w celu pobrania templatki ofertowej.</span>
        </div>
      </div>

      <div className="formWithResponse">
        <div className="formOutlineWrapper">
          <FormGraphic className="graphicposition mirrored" />
          <Form className="offerForm" onFinish={formik.handleSubmit} noValidate>
            <Button
              className="clearAllFieldsBtn"
              onClick={() => {
                formik.resetForm();
                setToggleResetOnSmallerForms(true);
              }}
            >
              Wyczyść pola
            </Button>
            <Divider
              className="offerFormTitle"
              orientation="left"
              orientationMargin="0"
            >
              Szczegóły dokumentu
            </Divider>
            <span className="info">
              Wybierz rodzaj oferty jaką chcesz wygenerować.
              <br />
              <br />
            </span>

            <Form.Item
              label="Typ oferty:"
              name="offer-type"
              required={true}
              onChange={formik.handleChange}
            >
              <div className="offer-type-with-response">
                <Radio.Group name="type">
                  <Radio.Button value="Oferta">Oferta</Radio.Button>
                  <Radio.Button value="Kontroferta I">
                    Kontroferta I
                  </Radio.Button>
                  <Radio.Button value="Kontroferta II">
                    Kontroferta II
                  </Radio.Button>
                </Radio.Group>
                {formik.touched.type && formik.errors.type ? (
                  <div className="err-message">{formik.errors.type}</div>
                ) : null}
              </div>
            </Form.Item>
            <Divider
              className="form-title"
              orientation="left"
              orientationMargin="0"
            >
              Informacje o sprzedawcy
            </Divider>
            <span className="info">
              Wstaw informacje na temat sprzedawcy, u którego będzie dokonywany
              zakup.
              <br />
            </span>
            <br />
            <div className="companyDataFields">
              <Form.Item
                label="Nazwa firmy:"
                name="company-name"
                required={true}
              >
                <div className="company-name-with-response">
                  <Input
                    name="company_name"
                    placeholder="Wyrabiacz tanich komponentów sp. z.o.o"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company_name}
                  />
                  {formik.touched.company_name && formik.errors.company_name ? (
                    <div className="err-message">
                      {formik.errors.company_name}
                    </div>
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
              <div className="gridWrapper">
                <Form.Item
                  label="Numer NIP:"
                  name="company-NIP"
                  required={true}
                >
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

                <Form.Item
                  label="Kod pocztowy:"
                  name="street-number"
                  required={true}
                  className="GridSpacing"
                >
                  <div className="street-number-with-response">
                    <Input
                      name="postal_code"
                      placeholder="35-036"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.postal_code}
                    />
                    {formik.touched.postal_code && formik.errors.postal_code ? (
                      <div className="err-message">
                        {formik.errors.postal_code}
                      </div>
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

                <Form.Item
                  label="Kraj:"
                  name="country"
                  required={true}
                  className="GridSpacing"
                >
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
            </div>
            <Divider
              className="form-title"
              orientation="left"
              orientationMargin="0"
            >
              Przedmioty do oferty
            </Divider>
            <span className="info">
              Wybierz produkty które mają zostać zawarte w ofercie, a następnie
              uzupełnij pola. Na koniec wrzuć screena np. koszyka zakupów
              potwierdzającego znalezienie oferty i kontroferty w podanych
              cenach.
            </span>

            <div className="single-product-wrapper">
              <Form.List name="single_product">
                {(fields, { add, remove }) => (
                  <div className="single-product-placing">
                    {fields.map((field) => {
                      if (toggleResetOnSmallerForms) {
                        //REMOVES ALL FIELDS!!
                        remove(fields.map((item) => item.name));
                        setHowManyItems(0);
                        setErrorArray([]);
                        setToggleResetOnSmallerForms(false);
                      }
                      return (
                        <div className="single-product" key={field.key}>
                          <RemoveItemBtn
                            className="remove-single-item"
                            onClick={() => {
                              remove(
                                fields
                                  .filter(function (item) {
                                    return item.name === field.name;
                                  })
                                  .map(function (field) {
                                    return field.name;
                                  })
                              );

                              setHowManyItems(howManyItems - 1);
                            }}
                          />
                          <Form.Item required={true} label="Nazwa produktu:">
                            <Input
                              name="item.product"
                              ref={(element) =>
                                (itemsNamesRefs.current[field.name] = element)
                              }
                              id={`name_${field.name}`}
                            />
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "A") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>

                          <Form.Item required={true} label="Ile szuk:">
                            <Input
                              name="item.amount"
                              ref={(element) =>
                                (amountNamesRefs.current[field.name] = element)
                              }
                              id={`amount_${field.name}`}
                            />
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "B") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>

                          <Form.Item required={true} label="Wartość brutto:">
                            <Input
                              name="item.brutto"
                              ref={(element) =>
                                (bruttoNamesRefs.current[field.name] = element)
                              }
                              id={`brutto_${field.name}`}
                            />
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "C") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>

                          <Form.Item required={true} label="Stawka VAT:">
                            <Input
                              name="item.vat"
                              ref={(element) =>
                                (vatNamesRefs.current[field.name] = element)
                              }
                              id={`vat_${field.name}`}
                              placeholder="Wpisz bez znaku %"
                            />
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "D") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>

                          <Form.Item required={true} label="Cena dostawy:">
                            <Input
                              name="item.delivery_price"
                              ref={(element) =>
                                (deliveryNamesRefs.current[field.name] =
                                  element)
                              }
                              id={`delivery_price_${field.name}`}
                              placeholder="Jeśli odbierasz osobiście wpisz 0"
                            />
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "E") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>

                          <Form.Item
                            required={true}
                            label="Zrzut ekranu:"
                            valuePropName="fileList"
                          >
                            <Upload
                              name="item.screen"
                              ref={(element) =>
                                (screenNamesRefs.current[field.name] = element)
                              }
                              customRequest={dummyRequest}
                              id={`upload_${field.name}`}
                              maxCount={1}
                              // console.log(screenNamesRefs.current[field.name].fileList[field.name].originFileObj);
                              listType="picture"
                            >
                              <Button
                                className="upload-file-button"
                                icon={<UploadOutlined />}
                              >
                                Prześlij max. 1
                              </Button>
                            </Upload>
                            {errorArray.length > 0 &&
                            errorArray[field.name] !== undefined
                              ? errorArray[field.name].errors.map(
                                  (e, index) => {
                                    if (e.charAt(0) === "F") {
                                      return (
                                        <div
                                          className="err-message"
                                          key={index}
                                        >
                                          {e.slice(2)}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )
                              : null}
                          </Form.Item>
                        </div>
                      );
                    })}
                    <div className="add-product">
                      <Form.Item>
                        <Button
                          className="offer-btn"
                          type="dashed"
                          onClick={() => {
                            add();
                            setHowManyItems(howManyItems + 1);
                          }}
                          block
                          icon={<PlusOutlined />}
                        >
                          Dodaj przedmiot
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                )}
              </Form.List>
            </div>
            <Form.Item>
              <Button
                type="submit"
                htmlType="submit"
                className="submitOfferBtn"
                onClick={createArrayOnSubmit}
              >
                {" "}
                Wygeneruj dokument PDF{" "}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default OffersPanel;
