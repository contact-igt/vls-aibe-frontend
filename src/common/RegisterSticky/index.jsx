import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
                <h4>🎯 Ready to Clear AIBE with Confidence?</h4>
                <h6>
                  ⏰ Limited Seats! Offer ends in -
                  <span>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds
                    }`}</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="pricing d-flex justify-content-lg-end justify-content-between align-items-center gap-3 py-md-1 py-2">
                {/* <div>
                  <p className={styles.pricing}>
                    Pay Advance ₹199
                    <br />
                    <small style={{ fontSize: '14px', color: '#ccc' }}>Total <span className={styles.strikePrice}>₹7,500 </span> <span className={styles.currentPrice}>₹2,500</span></small>
                  </p>
                  <p className={styles.mbinfo}>
                    (Offer end in{" "}
                    {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} )
                  </p>
                </div> */}
                <div className={styles.offerInfo}>
                  <div className={styles.seatDetails}>
                    <p className={styles.offerHeadline}>
                      Limited Seats Available
                    </p>
                    <p className={styles.offerSubtext}>
                      <span className={styles.seatsLeft}>{seatsLeft}</span> / 100 seats left ·
                    </p>
                  </div>
                </div>
                <div className={styles.pricebtn}>
                  <button
                    onClick={handleToggleToForm}
                    className="btn text-light"
                    style={{ cursor: "pointer", borderRadius: "20px", fontWeight: "600" }}
                  >
                    Book Your Slot
                  </button>
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
