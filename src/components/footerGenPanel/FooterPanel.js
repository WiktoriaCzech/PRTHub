import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Divider, Form, Button, Input, Upload } from "antd";
import "./FooterPanel.css";
import "../offersPanel/OffersPanel.css";
import { UploadOutlined } from "@ant-design/icons";

import { ReactComponent as FormGraphic } from "../images/svg/calendarGraphic.svg";
import { ReactComponent as GmailLogo } from "../images/svg/logos_google-gmail.svg";
import GenerateFooter from "./generator";

function FooterPanel() {
  const [showFooter, setShowFooter] = useState(false);
  const [saveData, setSaveData] = useState({});

  const [fileList, setFileList] = useState([]);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isUploadDisabled, setUploadDisabled] = useState(false);

  function getBackToForm() {
    setShowFooter(false);
  }

  const handleInputChange = (e) => {
    formik.handleChange(e);
    if (e.target.value) {
      setUploadDisabled(true);
    } else {
      setUploadDisabled(false);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  };

  const phoneRegExp =
    /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Max 15 znaków")
      .required("To pole jest wymagane"),
    surname: Yup.string()
      .max(20, "Max 20 znaków")
      .required("To pole jest wymagane"),
    position: Yup.string()
      .max(50, "Max 50 znaków")
      .required("To pole jest wymagane"),
    email: Yup.string()
      .email("Adress email jest niepoprawny")
      .required("To pole jest wymagane"),
    phone_number: Yup.string()
      .matches(phoneRegExp, "Numer telefonu jest niepoprawny")
      .required("To pole jest wymagane"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      position: "",
      email: "",
      phone_number: "",
      photo_link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Check if there's an uploaded file
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("position", values.position);
        formData.append("email", values.email);
        formData.append("phone_number", values.phone_number);

        // Assuming fileList[0] exists and contains the file to upload
        if (fileList.length > 0) {
          formData.append("photo_link", fileList[0].originFileObj);
        }
        //console.log(formData);
        setSaveData(formData);
      } else {
        // Handle the case where no file is uploaded but a URL might be provided
        //console.log("Submitting form without a file:", values);
        setSaveData(values);
      }

      setShowFooter(true);
    },
  });

  return (
    <div className="footerPanelWrapper">
      <div className="infoSectionWrapper">
        <div className="infoAboutFooter">
          <h1>Generator stopek e-mail</h1>
          <span>
            W celu dodania stopki (wizytówki) do swojej poczty wypełnij
            formularz, następnie otwórz i zaznacz wygenerowany dokument
            wciskając {<b className="setTextColour">Ctrl + A</b>} na
            klawiaturze. Skopiowaną stopkę (
            {<b className="setTextColour">Ctrl + C</b>}) wklej do wiadomości (
            {<b className="setTextColour">Ctrl + V</b>}) lub zmień ustawienia
            swojej poczty tak, żeby stopka była dołączana do każdej wiadomości.
          </span>
          <span>
            Instrukcję jak zmienić ustawienia poczty znajdziesz{" "}
            {<span className="textHighlited">poniżej</span>}.
          </span>
        </div>
        <div className="gmailInstructionsWrapper">
          <div className="gmailInstructions">
            <div className="mailLogoPosition">
              <GmailLogo className="gmailIcon" />
              <span>Gmail</span>
            </div>
            <div className="instructions">
              <ol>
                <li>Otwórz Gmaila.</li>
                <li>
                  W prawym górnym rogu kliknij w "Ustawienia", a następnie w
                  "Zobacz wszystkie ustawienia".
                </li>
                <li>
                  Na samym dole w sekcji "Podpis" kliknij w przycisk "Utwórz
                  nowy" i wklej skopiowaną wcześniej stopkę.
                </li>
                <li>Zapisz zmiany naciskając przycisk "Zapisz zmiany".</li>
              </ol>
            </div>
            <div className="downloadPDF">
              <span>Dokładna instrukcja pdf z obrazkami</span>
              <Button className="downloadBtn">Pobierz instrukcję PDF</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="formWithResponse">
        <div className="formOutlineWrapper footerForm">
          <FormGraphic className="wrapperDecoration mirrored" />
          {showFooter ? (
            <div className="generatedFooter">
              <Button className="goBackToForm" onClick={getBackToForm}>
                Wróć do formularza
              </Button>
              <span className="generatedFooterTitle">Wygenerowana stopka</span>
              <Divider />
              <div className="generated-footer-wrapper">
                <GenerateFooter data={saveData} />
              </div>
              <Divider />
            </div>
          ) : (
            <div>
              <Form
                className="offerForm"
                onFinish={formik.handleSubmit}
                noValidate
              >
                <Button
                  className="clearAllFieldsBtn"
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  Wyczyść pola
                </Button>
                <Divider
                  className="form-title"
                  orientation="left"
                  orientationMargin="0"
                >
                  Informacje do stopki
                </Divider>
                <span className="info">
                  Wstaw informacje o sobie.
                  <br />
                  <br />
                </span>
                <div className="gridWrapper">
                  <Form.Item label="Imię:" name="name" required={true}>
                    <div className="name-with-response">
                      <Input
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="err-message">{formik.errors.name}</div>
                      ) : null}
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Nazwisko:"
                    name="surname"
                    required={true}
                    className="gridSpacing"
                  >
                    <div className="surname-with-response">
                      <Input
                        name="surname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.surname}
                      />
                      {formik.touched.surname && formik.errors.surname ? (
                        <div className="err-message">
                          {formik.errors.surname}
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>

                  <Form.Item label="E-mail:" name="email" required={true}>
                    <div className="email-with-response">
                      <Input
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="err-message">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Numer telefonu:"
                    name="email"
                    required={true}
                    className="gridSpacing"
                  >
                    <div className="phone-with-response">
                      <Input
                        name="phone_number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone_number}
                      />
                      {formik.touched.phone_number &&
                      formik.errors.phone_number ? (
                        <div className="err-message">
                          {formik.errors.phone_number}
                        </div>
                      ) : null}
                    </div>
                  </Form.Item>
                </div>

                <Divider
                  className="form-title"
                  orientation="left"
                  orientationMargin="0"
                >
                  Stanowisko
                </Divider>
                <span className="info">
                  Poniżej wpisz jaką rolę pełnisz w zespole. Nazwę podaj w
                  języku angielskim np. IT Department, Chassis Department,
                  Suspension Department itd. <br />
                  <br />
                </span>

                <Form.Item label="Stanowisko:" name="position" required={true}>
                  <div className="section-with-response">
                    <Input
                      name="position"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.position}
                    />
                    {formik.touched.position && formik.errors.position ? (
                      <div className="err-message">
                        {formik.errors.position}
                      </div>
                    ) : null}
                  </div>
                </Form.Item>

                <Divider
                  className="form-title"
                  orientation="left"
                  orientationMargin="0"
                >
                  Zdjęcie
                </Divider>
                <span className="info">
                  Dodaj zdjęcie z komputera lub wklej link url do zdjęcia np. z
                  dysku google. <br />
                  <br />
                </span>

                <Form.Item
                  label="Link do zdjęcia:"
                  name="photo_link"
                  required={true}
                >
                  <div className="photo_link-with-response">
                    <Input
                      name="photo_link"
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.photo_link}
                      disabled={isInputDisabled}
                      className="setGapAfterInput"
                    />
                    <Upload
                      name="photo_link"
                      maxCount={1}
                      listType="picture"
                      beforeUpload={() => false} // Prevent automatic upload
                      onChange={handleUploadChange}
                      fileList={fileList}
                      disabled={isUploadDisabled}
                    >
                      <Button
                        className="upload-file-button"
                        icon={<UploadOutlined />}
                      >
                        Dodaj zdjęcie z komputera
                      </Button>
                    </Upload>
                    {formik.touched.photo_link && formik.errors.photo_link ? (
                      <div className="err-message">
                        {formik.errors.photo_link}
                      </div>
                    ) : null}
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className="submitOfferBtn"
                    // onClick={createArrayOnSubmit}
                  >
                    {" "}
                    Wygeneruj stopkę{" "}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FooterPanel;
