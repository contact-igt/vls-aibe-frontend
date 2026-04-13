import Button from "@/common/Button";
import styles from "./styles.module.css";
import { SafeDynamicIcon as DynamicIcon } from "@/common/SafeDynamicIcon";
import Form from "@/common/Form";
import { forwardRef, useEffect, useState } from "react";

const HeroBanner = forwardRef(
  ({ herobanner_constant, scrollToContactForm }, ref) => {
    const [seatsLeft, setSeatsLeft] = useState(12);
    useEffect(() => {
      const interval = setInterval(() => {
        setSeatsLeft((prev) => (prev > 6 ? prev - 1 : prev));
      }, 30000);
      return () => clearInterval(interval);
    }, []);
    return (
      <section className={styles.heroBannerSection}>
        <div className={styles.overlay}></div>

        <div className={styles.herobannerContent}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 py-3 ">
                <div className={styles.heroBannerContent}>
                  <h1 className={styles.heroBannerTitle}>
                    Clear <span> AIBE </span> By Decoding The{" "}
                    <span> BARE </span> Act
                  </h1>
                  <p className={styles.heroBannerDescription}>
                    {herobanner_constant?.description}
                  </p>
                  <div className={styles.bannerScheduleContent}>
                    <div className={styles.bannerText}>
                      <div className="d-flex align-items-center gap-3">
                        <DynamicIcon
                          name="calendar-check"
                          size={25}
                          className="d-none d-md-block"
                        />

                        <h2>Friday, Nov 25, 2025 - Wednesday</h2>
                      </div>

                      <div className="d-flex align-items-center gap-3 my-2">
                        <DynamicIcon
                          name="clock"
                          size={25}
                          className="d-none d-md-block"
                        />
                        <div className={styles.courseDetails}>
                          <span className={styles.totalHours}>Total 25hr</span>
                          <span className={styles.separator}>-</span>
                          <span className={styles.breakdown}>
                            12hr Theory + 13hr Test + Practice
                          </span>
                        </div>
                      </div>

                      <div className={styles.dateDetails}>
                        <span className={styles.dateItem}>May 01 (Fri)</span>
                        {/* <span className={styles.dateItem}>Nov 15 (Sat)</span>
                        <span className={styles.dateItem}>Nov 16 (Sun)</span> */}
                      </div>
                      <div className={styles.amountDetails}>
                        <div className={styles.limitedSeats}>
                          <strong>Limited Seats Available</strong>
                          <br />
                          <small>
                            Only{" "}
                            <span className={styles.seatsLeft}>
                              {seatsLeft}
                            </span>{" "}
                            / 50 seats left ·
                            <br className="d-block d-md-none" />
                            <span className={styles.timer}>
                              {" "}
                              ⏰ Offer ends soon
                            </span>
                          </small>
                        </div>
                        <Button
                          onClick={scrollToContactForm}
                          name="Join the Batch"
                          name_color="#ffffff"
                          bg_color="#b20a0a"
                          icon="notepad-text"
                          icon_color="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.bullet} my-5`}>
                    {herobanner_constant?.bullet_points?.map((data, i) => (
                      <div
                        key={i}
                        className={`${styles.bulletpoint} d-flex align-items-center gap-1 gap-3 mb-3`}
                      >
                        <DynamicIcon
                          name="circle-check"
                          color="#b20a0a"
                          size={25}
                        />
                        <p className="m-0">{data}</p>
                      </div>
                    ))}
                  </div>

                  <div className={`${styles.heroBannerCta} d-flex gap-4 pt-1`}>
                    <Button
                      onClick={scrollToContactForm}
                      name={"Book Your Slot"}
                      bg_color={"#b20a0a"}
                      name_color={"#ffff"}
                      icon={"notepad-text"}
                      btn_type={"button"}
                      icon_color={"#fff"}
                    />

                    <Button
                      name={"Chat on WhatsApp"}
                      bg_color={"#ffff"}
                      name_color={"#000"}
                      btn_type={"link"}
                      href={"http://wa.me/+919500025216"}
                      img={"/assets/whatsapp-icon.png"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 d-flex justify-content-center d-lg-block">
                <div ref={ref} className={styles.bannerForm}>
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default HeroBanner;
