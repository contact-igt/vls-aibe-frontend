"use client";

// import { NavbarLink } from "@/constants/navlink";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { HomePageConstant } from "@/constant/Home";

const Footer = () => {
  const handleClick = () => {
    const message = "AIBE";
    const encodedMsg = encodeURIComponent(message);
    const url = `http://wa.me/+919500025216?text=${encodedMsg}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section className={styles.info_section}>
        <div className={`${styles.info_container}`}>
          <div className="container">
            <div className={styles.info_main}>
              <div className="row">
                <div className="col-lg-5 col-md-6 col-12 mb-4 mb-md-0">
                  <div className={styles.info_logo}>
                    <a className={styles.brandlogo} href="/">
                      <img src={"/assets/vls_logo.png"} alt="logo" />
                    </a>
                  </div>
                  <p>
                    VLS law academy as a coaching institute for Law graduates
                    assisting them to scale up the Judicial services exams, Law
                    optional subject (IAS/civil services exam), UGC (Junior
                    research fellowship/ lectureship for law)
                  </p>
                </div>
                <div className="col-lg-2 col-md-3 col-12 mt-3 mt-md-0">
                  <div className={styles.info_link_box}>
                    <h5>Explore</h5>
                    <ul style={{ marginLeft: "0px" }}>
                      {HomePageConstant?.navLink?.slice(0, 4).map((i) => (
                        <li className=" footernav  active" key={i?.id}>
                          <a className="" href={i?.link}>
                            {i?.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-12 mt-3 mt-md-0">
                  <h5>Follow us on</h5>
                  <div className={styles.social_box}>
                    <a
                      href="https://www.youtube.com/@VLSLAWACADEMY"
                      target="_blank"
                      className="sbflex"
                    >
                      <img src="\assets\youtube.png" className="img-fluid yt" />
                      <p>Youtube</p>
                    </a>
                    <a
                      href="https://www.instagram.com/vlslawacademy/"
                      target="_blank"
                      className="sbflex"
                    >
                      <img
                        src="\assets\instagram.png"
                        className="img-fluid insta"
                      />
                      <p>Instagram</p>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/105212369/admin/dashboard/"
                      target="_blank"
                      className="sbflex"
                    >
                      <img
                        src="\assets\linkedin.png"
                        className="img-fluid linked"
                      />
                      <p>Linkedin</p>
                    </a>
                    <a
                      href="https://www.facebook.com/vlslawacademy"
                      target="_blank"
                      className="sbflex"
                    >
                      <img
                        src="\assets\facebook.png"
                        className="img-fluid face"
                      />
                      <p>Facebook</p>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-3 mt-md-5 mt-lg-0">
                  <div className={styles.info_link_box}>
                    <h5>Contact Us</h5>
                    <a
                      className={styles.address_box}
                      target="_blank"
                      href="https://maps.app.goo.gl/zwL1sgrgFjKqKJKA8"
                    >
                      <img
                        src="\assets\pin.png"
                        className="img-fluid face mt-2"
                      />
                      <p>
                        <span>Address :</span> No. 1910, 2nd Floor, H Block 5th
                        Street, 12th Main Road, Anna Nagar West, Chennai
                      </p>
                    </a>
                    <a
                      className={styles.address_box}
                      href="tel:+919500025216"
                      style={{ paddingTop: "15px" }}
                    >
                      <img src="\assets\call.png" className="img-fluid face " />
                      <p>+91 9500025216</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer_section}>
            <div className="container">
              <div className="d-md-flex justify-content-between ">
                <p className="text-md-start text-center">
                  &copy; <span id="displayYear"></span>
                  {new Date().getFullYear()} VLS Law Academy. All rights
                  reserved.
                </p>
                <div
                  className={`${styles.footer_terms} text-center text-md-end mt-3 mt-md-0`}
                >
                  <a
                    href="https://www.vlslawacademy.com/terms-and-conditions"
                    target="_blank"
                  >
                    Terms
                  </a>
                  <a
                    href="https://www.vlslawacademy.com/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.whatsappicon}>
        {/* <a href="http://wa.me/+919500025216" target="blank">
          <Image
            src={"/assets/whatsapp.png"}
            width={60}
            height={60}
            alt="whtasapp-logo"
          />
        </a> */}
        <Image
          src={"/assets/whatsapp.png"}
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
          alt="whtasapp-logo"
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default Footer;
