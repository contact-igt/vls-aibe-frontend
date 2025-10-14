import { useFormik } from "formik";
import Button from "../Button";
import styles from "./styles.module.css";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();
  const [loading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[A-Za-z\s']+$/, "Enter valid name"),
      email: Yup.string().required("Eamil is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
    }),
    onSubmit: async (value, Formik) => {
      // try {
      //   setisLoading(true);

      //   const ipResponse = await fetch("https://api.ipify.org?format=json");
      //   const ipData = await ipResponse.json();

      //   const payload = {
      //     name: value.name,
      //     mobile: value.mobile,
      //     page_name: "cataract",
      //     ip_address: ipData.ip,
      //     utm_source: localStorage.getItem("utm_source"),
      //   };

      //   useNetralyaQuery(payload)
      //     .then((data) => {
      //       console.log("Netralaya API Response:", data);
      //     })
      //     .catch((error) => {
      //       console.error("Error calling Netralaya API:", error);
      //     });

      //   const Formdata = {
      //     Name: value.name,
      //     MobileNumber: value.mobile,
      //     IP_Address: ipData.ip,
      //     utm_source: localStorage.getItem("utm_source"),
      //   };

      //   const params = new URLSearchParams();
      //   Object.keys(Formdata).forEach((key) => {
      //     params.append(key, Formdata[key]);
      //   });

      //   const res = await fetch(
      //     "https://script.google.com/macros/s/AKfycby0V7V8j32RnoU3ymvynxDNaH1bwdZEx14WqBN2R26EcNrKEyB3qXAm8qwDAnWWJQxc/exec",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },
      //       body: params.toString(),
      //     }
      //   );

      //   if (!res.ok) throw new Error("Submission failed");

      //   const data = await res.json();

      //   Formik.resetForm();
      //   handleTogglecontactForm(false);
      //   router.push("/thank-you");
      // } catch (err) {
      //   console.error("Error:", err);
      //   handleTogglecontactForm(false);
      // } finally {
      //   setisLoading(false);
      // }

      console.log("Values", value);
    },
  });

  return (
    <div>
      <div className={styles.formTopic}>
        <h3>Join the Batch</h3>
        <p>
          Please complete the form, make the payment, and confirm your seat now!
        </p>
        <h6>₹500 + GST (3.6%) = ₹518 total</h6>
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
        </div>

        <div className={styles.inputgrp}>
          <Button
            name={"Pay & Confirm Seats"}
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
