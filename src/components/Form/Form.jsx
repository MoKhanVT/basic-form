import React, { useEffect, useState } from "react";

import useForm from "../Validation/useForm";
import validate from "../Validation/validation";
import FormData from "./FormData";
import api from "../../config/api";

import axios from "axios";
import { toast } from "react-toastify";

import "./form.scss";

const Form = () => {
  const { handleChange, values, errors, getErrors } = useForm(validate);
  const [info, setInfo] = useState({});
  const [numberError, setNumberError] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    if (values.number?.length === 9) {
      axios
        .post(api.verifynumber(values?.number), {})
        .then((response) => {
          let res = JSON.parse(response?.data);
          if (res?.code === 404 && res?.message === "not found") {
            toast.error("Router Number Invalid");
            setNumberError("Router Number Invalid");
            setInfo({});
          } else {
            setNumberError("");
            let resRouting = JSON.parse(response?.data);
            setInfo(resRouting);
          }
        })
        .catch((err) => {
          toast.error("Could not fetch routing number details.");
          console.log({ err });
        });
    } else {
      setInfo({});
    }
  }, [values?.number]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getErrors(e);
    setApiResponse(null);
    const validateErrors = validate(values);
    let isValid = true;
    Object.keys(validateErrors).forEach((key) => {
      if (validateErrors[key]) {
        isValid = false;
      }
    });

    if (isValid && numberError === "") {
      let payload = {
        FirstName: values.firstName,
        LastName: values.lastName,
        Amount: values.amount,
        number: values.number,
        verifyNumber: values.verifyNumber,
        CheckNumber: values.checkNumber,
        City: values.city,
        Description: values.description,
        serviceNumber: values.serviceNumber,
        CustomerNumber: values.customerNumber,
        SignatureLine: values.signatureLine,
      };

      axios
        .post(api.form, payload)
        .then((response) => {
          toast.success("Form Submitted.");
          setApiResponse(response?.data?.success);
        })
        .catch((err) => {
          toast.error("Error while submitting the form. Try again later.");
          console.log({ err });
        });
    }
  };

  const handleOnClickPopup = () => {
    setApiResponse(null);
  };

  return (
    <>
      <form className="basic-form">
        <h1 style={{ textAlign: "center", margin: "1rem" }}>Form</h1>
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <div className="input_blk">
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="Chandler"
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <div className="input_blk">
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Bing"
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Amount</label>
            <div className="input_blk">
              <input
                type="text"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="0000"
              />
              {errors.amount && (
                <p className="error-message">{errors.amount}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Number (9-digits)*</label>
            <div className="input_blk">
              <input
                type="text"
                name="number"
                value={values.number}
                onChange={handleChange}
                placeholder="000000000"
              />
              {errors.number && (
                <p className="error-message">{errors.number}</p>
              )}
              {numberError && <p className="error-message">{numberError}</p>}
            </div>
            {info?.city !== undefined && (
              <>
                <br />
                <h3>Number Details</h3>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <p>Name: {info?.name}</p>
                  </div>
                  <div className="col-md-12">
                    <p>City: {info?.city}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-md-6">
            <label>Verify Number</label>
            <div className="input_blk">
              <input
                type="text"
                name="verifyNumber"
                value={values.verifyNumber}
                onChange={handleChange}
                placeholder="00000000"
              />
              {errors.verifyNumber && (
                <p className="error-message">{errors.verifyNumber}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Check Number</label>
            <div className="input_blk">
              <input
                type="text"
                name="checkNumber"
                value={values.checkNumber}
                onChange={handleChange}
                placeholder="000000"
              />
              {errors.checkNumber && (
                <p className="error-message">{errors.checkNumber}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>City</label>
            <div className="input_blk">
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                placeholder="City"
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <label>Description {values.description?.length}/30</label>
            <div className="input_blk">
              <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Your description here"
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Service Number (10-digits)*</label>
            <div className="input_blk">
              <input
                type="text"
                name="serviceNumber"
                value={values.serviceNumber}
                onChange={handleChange}
                placeholder="00000"
              />
              {errors.serviceNumber && (
                <p className="error-message">{errors.serviceNumber}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label>Customer Number</label>
            <div className="input_blk">
              <input
                type="text"
                name="customerNumber"
                value={values.customerNumber}
                onChange={handleChange}
                placeholder="00000"
              />
              {errors.customerNumber && (
                <p className="error-message">{errors.customerNumber}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <label>Signature Line {values.signatureLine?.length}/30</label>
            <div className="input_blk">
              <input
                type="text"
                name="signatureLine"
                value={values.signatureLine}
                onChange={handleChange}
                placeholder="Your signature line here"
              />
              {errors.signatureLine && (
                <p className="error-message">{errors.signatureLine}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {apiResponse !== null && <FormData data={apiResponse} onClick={handleOnClickPopup}/>}
        </div>
      </form>
    </>
  );
};

export default Form;
