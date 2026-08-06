import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import {
  isRegistrationOpen,
  getPrimaryCtaText,
  getSessionDisplay,
  DATE_TIME_ANNOUNCEMENT_TEXT,
} from "@/utils/programStatus";

const RegisterSticky = ({
  handleToggleToForm,
  config = defaultProgramConfig,
}) => {
  const [seatsLeft, setSeatsLeft] = useState(12);
  const isRegOpen = isRegistrationOpen(config);
  const ctaText = getPrimaryCtaText(config);
  const sessionText = getSessionDisplay(config);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 6 ? prev - 1 : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bottomfix}>
      <div className="container">
        <div className="row py-lg-3 py-2 align-items-center">
          <div className="col-lg-6 d-lg-block d-none">
            <div className={styles.meuntitle}>
              <h4>
                {isRegOpen ? "🎯 Secure Your Slot" : "📢 Join the Waitlist"}
              </h4>
              <h6>
                {config?.name || "AIBE Masterclass"} | {sessionText}
              </h6>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="pricing d-flex justify-content-lg-end justify-content-between align-items-center gap-3 py-md-1 py-2">
              <div className={styles.offerInfo}>
                <div className={`${styles.mbprice} d-block d-lg-none`}>
                  <h4>
                    {isRegOpen ? "Secure Your Slot" : "Join Waitlist"}
                  </h4>
                  <p style={{ fontSize: "11px", margin: 0 }}>
                    {config?.name || "AIBE Masterclass"} | {sessionText}
                  </p>
                </div>

                {isRegOpen && (
                  <div className={styles.seatDetails}>
                    <p className={`${styles.offerHeadline} d-none d-md-block`}>
                      Limited Seats Available
                    </p>
                    <p className={styles.offerSubtext}>
                      <span className={styles.seatsLeft}>{seatsLeft}</span> / 50 seats left
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.pricebtn}>
                <Button
                  icon={"circle-check"}
                  icon_color={"#fff"}
                  onClick={handleToggleToForm}
                  name={ctaText}
                  bg_color={"#b20a0a"}
                  name_color={"#ffff"}
                />
                <div className={styles.confirmationText}>
                  <span>
                    {isRegOpen ? "✓ Reserve your seat" : "✓ Get notified first"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSticky;
