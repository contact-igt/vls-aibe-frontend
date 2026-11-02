import { useFormik } from "formik";
import Button from "../Button";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { useState } from "react";
import { useVlsAibeQuery as submitAibeEnquiry } from "@/hooks/useVlsAibeQuery";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import {
  getProgramDate,
  getProgramStartDate,
  getProgramEndDate,
} from "@/utils/programStatus";

const Form = ({ config = defaultProgramConfig, idPrefix = "lead" }) => {
  const [generalError, setGeneralError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const progDate = getProgramDate(config);
  const progStartDate = getProgramStartDate(config);
  const progEndDate = getProgramEndDate(config);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      completed_llb: "",
      aibe_exam: "",
      preparation_type: "",
      start_timeline: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s'.]+$/, "Please enter a valid full name")
        .required("Full name is required"),
      mobile: Yup.string()
        .trim()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .trim()
        .email("Please enter a valid email address")
        .required("Email address is required"),
      completed_llb: Yup.string().required(
        "Please select your LLB completion status"
      ),
      aibe_exam: Yup.string().required(
        "Please select which AIBE exam you are preparing for"
      ),
      preparation_type: Yup.string().required(
        "Please select the type of AIBE preparation you are looking for"
      ),
      start_timeline: Yup.string().required(
        "Please select when you would like to start your preparation"
      ),
    }),

    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      setGeneralError(null);

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

        const leadData = {
          sheetName: "Lead Enquiries",
          "Full Name": values.name,
          "Mobile Number": values.mobile,
          "Email Address": values.email,
          "Have you completed your LLB?": values.completed_llb,
          "Which AIBE exam are you preparing for?": values.aibe_exam,
          "What type of AIBE preparation are you looking for?":
            values.preparation_type,
          "When would you like to start your preparation?":
            values.start_timeline,
          utm_source: getUTM("utm_source"),
          utm_medium: getUTM("utm_medium"),
          utm_campaign: getUTM("utm_campaign"),
          utm_term: getUTM("utm_term"),
          utm_content: getUTM("utm_content"),
        };

        const apiPayload = {
          name: values.name || "",
          email: values.email,
          mobile: `91${values.mobile}`,
          completed_llb: values.completed_llb,
          aibe_exam: values.aibe_exam,
          preparation_type: values.preparation_type,
          start_timeline: values.start_timeline,
          programm_date: progDate,
          programm_start_date: progStartDate,
          programm_end_date: progEndDate,
          page_name: config?.pageName || "aibe-lead-form",
          ip_address: userIpAddress,
          utm_source: getUTM("utm_source"),
          utm_medium: getUTM("utm_medium"),
          utm_campaign: getUTM("utm_campaign"),
          utm_term: getUTM("utm_term"),
          utm_content: getUTM("utm_content"),
        };

        const params = new URLSearchParams();
        Object.keys(leadData).forEach((key) => {
          params.append(key, leadData[key] || "N/A");
        });

        resetForm();

        await Promise.allSettled([
          handleGoogleSheetForm(params),
          submitAibeEnquiry(apiPayload),
        ]);

        afterRegisterSuccessful(leadData);
      } catch (err) {
        console.error("Form submission failed:", err);
        setGeneralError("Something went wrong. Please try submitting again.");
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSheetForm = async (formData) => {
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxhwtbWE1kwk0o6gnSb-Ycgp6yNbnLrYZL5Gm2h6z5gX8waG-2Oi_xoqPtcfxzNwN-j/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      console.log("Sheet response executed successfully (no-cors)");
    } catch (err) {
      console.error("Sheet submit error:", err);
    }
  };

  const afterRegisterSuccessful = (data) => {
    setTimeout(() => {
      localStorage.setItem("PaymentDeatls", JSON.stringify(data));
      window.location.href = "/thank-you";
      setIsLoading(false);
    }, 800);
  };

  const llbOptions = ["Yes", "Not yet, currently pursuing LLB"];

  const aibeExamOptions = [
    "Upcoming AIBE examination",
    "Preparing for a future attempt",
    "Reappearing for AIBE",
  ];

  const prepTypeOptions = [
    "Online coaching",
    "Offline classroom coaching",
    "Complete preparation course",
  ];

  const startTimelineOptions = [
    "Immediately",
    "Within 1 month",
    "Just exploring options",
  ];

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTopic}>
        <p>
          Fill out the details below to get expert guidance and course details
          for your AIBE preparation.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Full Name */}
        <div className={styles.inputgrp}>
          <label className={styles.questionLabel} htmlFor={`${idPrefix}-name`}>
            Full Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
            aria-describedby={formik.touched.name && formik.errors.name ? `${idPrefix}-name-error` : undefined}
            type="text"
            placeholder="Enter your full name"
            {...formik.getFieldProps("name")}
            style={{
              borderColor:
                formik.touched.name && formik.errors.name ? "#b20a0a" : undefined,
            }}
          />
          {formik.touched.name && formik.errors.name && (
            <span id={`${idPrefix}-name-error`} className={styles.errorMessage} role="alert">{formik.errors.name}</span>
          )}
        </div>

        {/* Mobile Number */}
        <div className={styles.inputgrp}>
          <label className={styles.questionLabel} htmlFor={`${idPrefix}-mobile`}>
            Mobile Number <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id={`${idPrefix}-mobile`}
            autoComplete="tel-national"
            aria-required="true"
            aria-invalid={Boolean(formik.touched.mobile && formik.errors.mobile)}
            aria-describedby={formik.touched.mobile && formik.errors.mobile ? `${idPrefix}-mobile-error` : undefined}
            type="tel"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            {...formik.getFieldProps("mobile")}
            style={{
              borderColor:
                formik.touched.mobile && formik.errors.mobile
                  ? "#b20a0a"
                  : undefined,
            }}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <span id={`${idPrefix}-mobile-error`} className={styles.errorMessage} role="alert">{formik.errors.mobile}</span>
          )}
        </div>

        {/* Email Address */}
        <div className={styles.inputgrp}>
          <label className={styles.questionLabel} htmlFor={`${idPrefix}-email`}>
            Email Address <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
            aria-describedby={formik.touched.email && formik.errors.email ? `${idPrefix}-email-error` : undefined}
            type="email"
            placeholder="Enter your email address"
            {...formik.getFieldProps("email")}
            style={{
              borderColor:
                formik.touched.email && formik.errors.email
                  ? "#b20a0a"
                  : undefined,
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <span id={`${idPrefix}-email-error`} className={styles.errorMessage} role="alert">{formik.errors.email}</span>
          )}
        </div>

        {[
          { name: "completed_llb", label: "Have you completed your LLB?", options: llbOptions },
          { name: "aibe_exam", label: "Which AIBE exam are you preparing for?", options: aibeExamOptions },
          { name: "preparation_type", label: "What type of AIBE preparation are you looking for?", options: prepTypeOptions },
          { name: "start_timeline", label: "When would you like to start your preparation?", options: startTimelineOptions },
        ].map(({ name, label, options }) => {
          const hasError = Boolean(formik.touched[name] && formik.errors[name]);
          return (
            <div className={styles.inputgrp} key={name}>
              <label className={styles.questionLabel} htmlFor={`${idPrefix}-${name}`}>
                {label} <span className={styles.requiredStar}>*</span>
              </label>
              <select
                id={`${idPrefix}-${name}`}
                {...formik.getFieldProps(name)}
                aria-required="true"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${idPrefix}-${name}-error` : undefined}
              >
                <option value="" disabled>Select an option</option>
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              {hasError && (
                <span id={`${idPrefix}-${name}-error`} className={styles.errorMessage} role="alert">
                  {formik.errors[name]}
                </span>
              )}
            </div>
          );
        })}

        {generalError && (
          <p className={styles.errorMessage} role="alert">{generalError}</p>
        )}

        {/* Submit Button */}
        <div className={styles.submitBtnGrp}>
          <Button
            disabled={isLoading}
            name={isLoading ? "Submitting..." : "Submit Enquiry"}
            bg_color={"#b20a0a"}
            name_color={"#ffffff"}
            btn_type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
