import { useFormik } from "formik";
import Button from "../Button";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { useState } from "react";
import { Popup } from "../Popup";
import { useVlsAibeQuery } from "@/hooks/useVlsAibeQuery";

const Form = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().matches(/^[A-Za-z\s']+$/, "Enter valid name"),
      email: Yup.string().required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setisLoading(true);
      // setError(null);
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99 }),
      });

      const order = await resp.json();

      if (!resp.ok) {
        console.error("Create order failed", order);
        setisLoading(false);
        window.location.href = "/error";
        return;
      } else {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order?.amount * 100,
          currency: "INR",
          name: values?.name,
          order_id: order.id,
          description: "Advance amount of AIBE ",

          handler: async (response) => {
            if (response?.razorpay_payment_id) {
              setisLoading(true);

              const ipResponse = await fetch(
                "https://api.ipify.org?format=json"
              );
              const ipData = await ipResponse.json();

              const formData = {
                Name: values?.name,
                Email: values?.email,
                Mobile: `91${values?.mobile}`,
                Amount: order?.amount / 100,
                Razorpay_Transaction_Id: response?.razorpay_payment_id,
                Payment_Status: "Paid",
                ip_address: ipData.ip,
                utm_source: localStorage.getItem("utm_source"),
                utm_medium: localStorage.getItem("utm_medium"),
                utm_campaign: localStorage.getItem("utm_campaign"),
                utm_term: localStorage.getItem("utm_term"),
                utm_content: localStorage.getItem("utm_content"),
              };

              const apiPayload = {
                name: values?.name ? values?.name : "",
                email: values?.email,
                mobile: `91${values?.mobile}`,
                amount: order?.amount / 100,
                programm_start_date: "2025-11-14",
                programm_end_date: "2025-11-16",
                razorpay_order_id: response.razorpay_order_id
                  ? response.razorpay_order_id
                  : "",
                razorpay_payment_id: response.razorpay_payment_id
                  ? response.razorpay_payment_id
                  : "",
                razorpay_signature: response.razorpay_signature
                  ? response.razorpay_signature
                  : "",
                payment_status: "paid",
                captured: response.captured ? response.captured : "",
                ip_address: ipData.ip,
                utm_source: localStorage.getItem("utm_source"),
                utm_medium: localStorage.getItem("utm_medium"),
                utm_campaign: localStorage.getItem("utm_campaign"),
                utm_term: localStorage.getItem("utm_term"),
                utm_content: localStorage.getItem("utm_content"),
              };

              const whatsappPayload = {
                phone: `91${values?.mobile}`,
                name: values?.name,
                amount: 99,
                event_dates: "Nov 14, 15 & 16",
                event_date_time:
                  "Nov 14 → 5.00 PM – 9.00 PM IST  ,  Nov 15 & 16 → 9:30 AM – 1:00 PM IST",
                platform: "Google Meet",
                link_date: "Thursday Nov, 13",
              };

              useVlsAibeQuery(apiPayload)
                .then((res) => {
                  const params = new URLSearchParams();
                  Object.keys(formData).forEach((key) => {
                    params.append(key, formData[key]);
                  });
                  resetForm();
                  afterRegisterSuccessufull(formData);
                  handleWhatsappMessage(whatsappPayload);
                  handleGoogleSheetForm(params);
                })
                .catch((err) => {
                  setisLoading(false);
                  resetForm();
                  window.location.href = "/error";
                });
            } else {
              window.location.href = "/error";
              setisLoading(false);
            }
          },
          prefill: {
            name: values?.name,
            email: values?.email,
            contact: values?.mobile,
          },
          theme: { color: "#b20a0a" },
        };
        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function () {
          window.location.href = "/error";
          setisLoading(false);
        });

        razor.open();
      }

      // const ipResponse = await fetch(
      //   "https://api.ipify.org?format=json"
      // );
      // const ipData = await ipResponse.json();

      // const formData = {
      //   Name: values?.name,
      //   Email: values?.email,
      //   Mobile: `91${values?.mobile}`,
      //   ip_address: ipData.ip,
      //   utm_source: localStorage.getItem("utm_source"),
      //   utm_medium: localStorage.getItem("utm_medium"),
      //   utm_campaign: localStorage.getItem("utm_campaign"),
      //   utm_term: localStorage.getItem("utm_term"),
      //   utm_content: localStorage.getItem("utm_content"),
      // };
      // const params = new URLSearchParams();
      // Object.keys(formData).forEach((key) => {
      //   params.append(key, formData[key]);
      // });
      // try {
      //   const sheetRes = await fetch(
      //     "https://script.google.com/macros/s/AKfycbxIyM62qbYBnExLbJkN-b41b47R3T4gVvpucUpGfLBF2oyl3OCW5Zb_LOl90KKCtB97/exec",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },
      //       body: params.toString(),
      //     }
      //   );
      //   setTimeout(() => {
      //     window.location.href = "/thank-you";
      //     setisLoading(false);
      //     resetForm();
      //   }, 2000);
      //   console.log("response", sheetRes);
      // } catch (err) {
      //   setError("Something went wrong. Please try again!");
      //   console.error("Fetch error:", err);
      //   console.log("Server error. Please try again later.");
      // }
    },
  });

  const handleWhatsappMessage = async (apiPayload) => {
    try {
      const res = await fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      console.log("response", res);
    } catch (err) {
      console.error("Fetch error:", err);
      console.log("Server error. Please try again later.");
    }
  };

  const handleGoogleSheetForm = async (formData) => {
    try {
      const sheetRes = await fetch(
        "https://script.google.com/macros/s/AKfycbxIyM62qbYBnExLbJkN-b41b47R3T4gVvpucUpGfLBF2oyl3OCW5Zb_LOl90KKCtB97/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      console.log("response", sheetRes);
    } catch (err) {
      console.error("Fetch error:", err);
      console.log("Server error. Please try again later.");
    }
  };

  const afterRegisterSuccessufull = (formData) => {
    setTimeout(() => {
      window.location.href = "/thank-you";
      localStorage.setItem("PaymentDeatls", JSON.stringify(formData));
      setisLoading(false);
    }, 5000);
  };

  return (
    <div>
      <div className={styles.formTopic}>
        <h3>Join the Batch</h3>
        <p>Fill out the form, pay ₹99, and confirm your seat today!</p>
        {/* <p>Please complete the form, and confirm your seat now!</p> */}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputgrp}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            {...formik.getFieldProps("name")}
            style={{
              border:
                formik.touched.name && formik.errors.name
                  ? "2px solid #b20a0a"
                  : "2px solid #b5b6b8",
            }}
          />
          {formik.touched.name && formik.errors.name ? (
            <small className="text-danger">{formik.errors.name}</small>
          ) : (
            ""
          )}
        </div>

        <div className={styles.inputgrp}>
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="your@gmail.com"
            {...formik.getFieldProps("email")}
            style={{
              border:
                formik.touched.email && formik.errors.email
                  ? "2px solid #b20a0a"
                  : "2px solid #b5b6b8",
            }}
          />
          {formik.touched.email && formik.errors.email ? (
            <small className="text-danger">{formik.errors.email}</small>
          ) : (
            ""
          )}
        </div>

        <div className={styles.inputgrp}>
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            placeholder="+91 xxxxx xxxxx"
            {...formik.getFieldProps("mobile")}
            style={{
              border:
                formik.touched.mobile && formik.errors.mobile
                  ? "2px solid #b20a0a"
                  : "2px solid #b5b6b8",
            }}
          />
          {formik.touched.mobile && formik.errors.mobile ? (
            <small className="text-danger">{formik.errors.mobile}</small>
          ) : (
            ""
          )}
        </div>
        <p className={styles.errorMessage}>{error}</p>
        <div className={styles.inputgrp}>
          <Button
            disabled={isLoading}
            name={isLoading ? "Booking..." : "Start Your Journey for ₹99"}
            bg_color={"#b20a0a"}
            name_color={"#ffff"}
            btn_type={"submit"}
          />
        </div>
      </form>

      <Popup
        open={isLoading}
        onClose={() => {
          handleTogglecontactForm();
        }}
      >
        <div className={styles.loadingPopup}>
          <h4>⚠️ Do Not Close or Refresh</h4>
          <p>
            Your payment has been received. We are completing your registration.
            Please stay on this page until the process is complete.
          </p>
          <h6>⏳ Processing... Please wait.</h6>
        </div>
      </Popup>
    </div>
  );
};

export default Form;
