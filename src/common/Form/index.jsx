import { useFormik } from "formik";
import Button from "../Button";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { useState } from "react";
import { Popup } from "../Popup";
import { useVlsAibeQuery } from "@/hooks/useVlsAibeQuery";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import {
  isRegistrationOpen,
  getPrimaryCtaText,
  getProgramDate,
  getProgramStartDate,
  getProgramEndDate,
} from "@/utils/programStatus";

const Form = ({ config = defaultProgramConfig }) => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const isRegOpen = isRegistrationOpen(config);
  const progDate = getProgramDate(config);
  const progStartDate = getProgramStartDate(config);
  const progEndDate = getProgramEndDate(config);

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
      try {
        let userIpAddress = "Unknown";
        try {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            userIpAddress = ipData.ip || "Unknown";
          }
        } catch (ipErr) {
          console.warn("IP fetch failed, continuing without IP:", ipErr);
        }

        const getUTM = (key) =>
          typeof window !== "undefined" ? localStorage.getItem(key) || "" : "";

        if (!isRegOpen) {
          // ==================== WAITLIST FLOW ====================
          const waitlistData = {
            Name: values?.name,
            Email: values?.email,
            Mobile: `91${values?.mobile}`,
            Amount: "",
            Razorpay_Transaction_Id: "",
            Payment_Status: "waitlist",
            programm_date: progDate, // Strictly "TBA"
            programm_start_date: progStartDate,
            programm_end_date: progEndDate,
            page_name: config?.pageName || "aibe-weekend-batch",
            ip_address: userIpAddress,
            utm_source: getUTM("utm_source"),
            utm_medium: getUTM("utm_medium"),
            utm_campaign: getUTM("utm_campaign"),
            utm_term: getUTM("utm_term"),
            utm_content: getUTM("utm_content"),
          };

          const apiPayload = {
            name: values?.name || "",
            email: values?.email,
            mobile: `91${values?.mobile}`,
            amount: "",
            programm_date: progDate, // Strictly "TBA"
            programm_start_date: progStartDate,
            programm_end_date: progEndDate,
            razorpay_order_id: "",
            razorpay_payment_id: "",
            razorpay_signature: "",
            payment_status: "waitlist",
            captured: "",
            page_name: config?.pageName || "aibe-weekend-batch",
            ip_address: userIpAddress,
            utm_source: getUTM("utm_source"),
            utm_medium: getUTM("utm_medium"),
            utm_campaign: getUTM("utm_campaign"),
            utm_term: getUTM("utm_term"),
            utm_content: getUTM("utm_content"),
          };

          const params = new URLSearchParams();
          Object.keys(waitlistData).forEach((key) => {
            params.append(key, waitlistData[key] || "N/A");
          });

          resetForm();

          await Promise.allSettled([
            handleGoogleSheetForm(params),
            useVlsAibeQuery(apiPayload),
          ]);

          afterRegisterSuccessful(waitlistData);
          return;
        }

        // ==================== ACTIVE REGISTRATION FLOW (WITH RAZORPAY) ====================
        let order;
        try {
          const resp = await fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: config?.fee || 499 }),
          });
          order = await resp.json();
          if (!resp.ok) {
            console.error("Create order failed", order);
            setisLoading(false);
            window.location.href = "/error";
            return;
          }
        } catch (orderErr) {
          console.error("Order creation failed:", orderErr);
          setisLoading(false);
          window.location.href = "/error";
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          // key: "rzp_test_Ss2NFtpJFLRAiw",
          amount: order.amount,
          currency: order.currency || "INR",
          name: values?.name || "AIBE Masterclass",
          order_id: order.id,
          description: `${config?.name || "AIBE Masterclass"} - ₹${config?.fee || 499}`,
          prefill: {
            name: values?.name,
            email: values?.email,
            contact: values?.mobile,
          },
          theme: { color: "#b20a0a" },
          handler: async function (response) {
            const formData = {
              Name: values?.name,
              Email: values?.email,
              Mobile: `91${values?.mobile}`,
              Amount: order.amount / 100,
              Razorpay_Transaction_Id: response.razorpay_payment_id || "N/A",
              Payment_Status: "paid",
              programm_date: progDate,
              programm_start_date: progStartDate,
              programm_end_date: progEndDate,
              page_name: config?.pageName || "aibe-weekend-batch",
              ip_address: userIpAddress,
              utm_source: getUTM("utm_source"),
              utm_medium: getUTM("utm_medium"),
              utm_campaign: getUTM("utm_campaign"),
              utm_term: getUTM("utm_term"),
              utm_content: getUTM("utm_content"),
            };

            const apiPayload = {
              name: values?.name || "",
              email: values?.email,
              mobile: `91${values?.mobile}`,
              amount: order.amount / 100,
              programm_date: progDate,
              programm_start_date: progStartDate,
              programm_end_date: progEndDate,
              razorpay_order_id: response.razorpay_order_id || order.id || "",
              razorpay_payment_id: response.razorpay_payment_id || "",
              razorpay_signature: response.razorpay_signature || "",
              payment_status: "paid",
              captured: "true",
              page_name: config?.pageName || "aibe-weekend-batch",
              ip_address: userIpAddress,
              utm_source: getUTM("utm_source"),
              utm_medium: getUTM("utm_medium"),
              utm_campaign: getUTM("utm_campaign"),
              utm_term: getUTM("utm_term"),
              utm_content: getUTM("utm_content"),
            };

            const params = new URLSearchParams();
            Object.keys(formData).forEach((key) => {
              params.append(key, formData[key] || "N/A");
            });

            resetForm();

            await Promise.allSettled([
              handleGoogleSheetForm(params),
              useVlsAibeQuery(apiPayload),
            ]);

            afterRegisterSuccessful(formData);
          },
          modal: {
            ondismiss: function () {
              setisLoading(false);
            },
          },
        };

        if (typeof window !== "undefined" && window.Razorpay) {
          const razor = new window.Razorpay(options);
          razor.on("payment.failed", function (failResp) {
            console.error("Payment failed:", failResp);
            setisLoading(false);
            window.location.href = "/error";
          });
          razor.open();
        } else {
          console.error("Razorpay SDK not loaded");
          setisLoading(false);
        }
      } catch (err) {
        console.error("Form execution failed:", err);
        setisLoading(false);
      }
    },
  });

  const handleGoogleSheetForm = async (formData) => {
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxIyM62qbYBnExLbJkN-b41b47R3T4gVvpucUpGfLBF2oyl3OCW5Zb_LOl90KKCtB97/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      console.log("Sheet response executed automatically (no-cors)");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const afterRegisterSuccessful = (data) => {
    setTimeout(() => {
      localStorage.setItem("PaymentDeatls", JSON.stringify(data));
      window.location.href = "/thank-you";
      setisLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className={styles.formTopic}>
        <h3>{isRegOpen ? "Reserve Your Seat" : "Join Waitlist"}</h3>
        <p>
          {isRegOpen
            ? `Please complete the form and confirm your seat for ${config?.name || "the session"} (₹${config?.fee || 499})!`
            : `Enter your details to get notified when the next batch for ${config?.name || "this session"} is announced.`}
        </p>
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
            name={
              isLoading
                ? "Submitting..."
                : isRegOpen
                ? "Confirm Your Seat"
                : "Join Waitlist"
            }
            bg_color={"#b20a0a"}
            name_color={"#ffff"}
            btn_type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
