import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";

const RegisterSticky = ({ handleToggleToForm }) => {
  const [time, setTime] = useState(15 * 60);
  const [seatsLeft, setSeatsLeft] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 6 ? prev - 1 : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <div className={styles.bottomfix}>
        <div className="container">
          <div className="row py-lg-3 py-2">
            <div className="col-lg-6 d-lg-block d-none">
              <div className={styles.meuntitle}>
            

                <h4>
                  🎯 Secure Your Slot with ₹499 ( Total ₹3,000{" "}
                  <span className={styles.strikePrice}> ₹7,500 </span> )
                </h4>
                {/* <h6>
                  ⏰ Limited Seats! Offer ends in -
                  <span>{`${minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}</span>
                </h6> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="pricing d-flex justify-content-lg-end justify-content-between align-items-center gap-3 py-md-1 py-2">
                <div className={styles.offerInfo}>
                  <div className={`${styles.mbprice} d-block d-lg-none`}>
                    <h4>
                      Pay ₹499 ( Total ₹3,000{" "}
                      <span className={styles.strikePrice}> ₹7,500 </span> )
                    </h4>
                  </div>

                  <div className={styles.seatDetails}>
                    <p className={`${styles.offerHeadline} d-none d-md-block`}>
                      Limited Seats Available
                    </p>

                    <p className={styles.offerSubtext}>
                      <span className={styles.seatsLeft}>{seatsLeft}</span> /
                      50 seats left ·
                    </p>
                  </div>
                </div>
                <div className={styles.pricebtn}>
      
                  <Button
                    onClick={handleToggleToForm}
                    name={"Book Your Slot ₹499"}
                    bg_color={"#b20a0a"}
                    name_color={"#ffff"}
                  />
                  <div className={styles.confirmationText}>
                    <span>✓ Secure your seat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSticky;
