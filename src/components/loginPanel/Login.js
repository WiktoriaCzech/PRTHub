import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import BolidPixel from "../images/bolidPixelSmall.png";

import { ReactComponent as Logo } from "../images/svg/logoPRzRT.svg";
import { ReactComponent as BackgroundLong } from "../images/svg/backgroundLong.svg";
import { ReactComponent as MainPhoto } from "../images/svg/mainPhoto.svg";

import PostReq from "../../fetchReq/POST";

function Login() {
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [response, setResponse] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email jest niepoprawny")
        .required("To pole jest wymagane"),
      password: Yup.string().required("To pole jest wymagane"),
    }),
    onSubmit: (values) => {
      //console.log(values);
      PostReq({
        data: values,
        setPostResponse: setResponse,
        setError: setLoginError,
        endpoint: "user/getUserInfo",
      });
    },
  });

  useEffect(() => {
    if (loginError && response && response.success) {
      navigate("/home");
    }
  }, [loginError, response]);

  return (
    <div className="siteWrapper">
      <div className="contentsPlacing">
        <div className="loginWrapper">
          <div className="logoPRzRT">
            <Logo />
          </div>
          <div className="loginCredentials">
            <span className="loginText textLoginSite">Zaloguj się</span>
            {loginError && (
              <div className="fetchFailedWrapper">
                <div className="fetchFailedMessage">
                  Nieprawidłowy e-mail i/lub hasło
                </div>
              </div>
            )}
            <form
              className="loginForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <label className="formLabel textLoginSite">Email</label>
              <input
                className="formInput"
                type="text"
                name="email"
                placeholder="example_email@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="errMessage">{formik.errors.email}</div>
              ) : null}

              <label className="formLabel textLoginSite">Hasło</label>
              <div className="inputFieldWithSVG">
                <input
                  className="formInput"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="errMessage">{formik.errors.password}</div>
              ) : null}
              <div className="btnWrapper">
                <button className="submitBtn" type="submit">
                  <img
                    src={BolidPixel}
                    alt="bolidPixel"
                    className="bolidPixel"
                  />
                  Zaloguj
                </button>
              </div>
              <a href="/nwm" className="forgottPassword">
                Nie pamiętam hasła
              </a>
            </form>
          </div>
          <div className="footer">Prz Racing Team © Copyright 2024</div>
        </div>
        <div className="graphic">
          <BackgroundLong className="backgroundSVG" />
          <MainPhoto className="mainPhotoSVG" />
        </div>
      </div>
    </div>
  );
}
export default Login;
