import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

const Response = () => {
  const [userDetail, setuserDeatil] = useState();
  const router = useRouter();
  const [issuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setIsSuccess(router.pathname === "/thank-you" || router.query.response === "thank-you");
    }
  }, [router.isReady, router.pathname, router.query.response]);

  useEffect(() => {
    setuserDeatil(JSON.parse(localStorage.getItem("PaymentDeatls")));
  }, []);
  if (issuccess === null) {
    return (
      <section className={`pt-5 mt-5 ${styles.responseSection}`}>
        <div
          className="container d-flex flex-column align-items-center justify-content-center text-center"
          style={{ height: "60vh" }}
        >
          <div className={styles.loader}></div>
          <p className="mt-3 fw-semibold text-muted">Please wait...</p>
        </div>
      </section>
    );
  }
  return (
    <section className={`pt-5 mt-5 ${styles.responseSection}`}>
      <div className="container">
        <div
          className={`d-flex justify-content-center text-center ${styles.responseIcon}`}
        >
          <Image
            src={issuccess ? "/assets/success.png" : "/assets/error.png"}
            alt="icon"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className={`text-center ${styles.responseInfo}`}>
          <h5 className={issuccess ? styles.successText : styles.errorText}>
            {issuccess ? "Thank You for Your Booking!" : "Booking Failed"}
          </h5>

          {issuccess ? (
            <>
              <p className="mt-3">
                Your booking for the
                <strong> AIBE Weekend Batch </strong>
                has been successfully received.
              </p>
              <p className="text-muted mt-2">
                Our team will contact you within 24 hours via phone or WhatsApp to confirm your booking and provide the payment details to complete your enrollment.
              </p>
              <p className="fw-semibold mt-3 text-success">
                We look forward to helping you succeed in the AIBE exam! 🎯
              </p>
              {userDetail ? (
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Booking Details:</strong>
                  </p>
                  <p>
                    <strong>Name:</strong> {userDetail.Name || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetail.Email || "-"}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userDetail.Mobile || "-"}
                  </p>
                  {/* ======== COMMENTED OUT: PAYMENT DETAILS ========
                  <p>
                    <strong>Amount:</strong> ₹{userDetail.Amount || "-"}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {userDetail?.Razorpay_Transaction_Id || "Not Available"}
                  </p>
                  ======== END COMMENTED: PAYMENT DETAILS ======== */}
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <p>
              Oops! We couldn't process your booking. Please try again or call
              us directly for support.
            </p>
          )}
        </div>

        <div
          className={`d-md-flex justify-content-center gap-3 ${styles.responseCta}`}
        >
          <Button
            name={"Back To Home"}
            bg_color={"#b20a0a"}
            name_color={"#ffff"}
            icon={"arrow-left"}
            btn_type={"link"}
            icon_color={"#fff"}
            href={"/"}
          />
          <Button
            name={"Call To Support"}
            bg_color={"#b20a0a"}
            name_color={"#ffff"}
            icon={"phone"}
            btn_type={"link"}
            icon_color={"#fff"}
            href={"tel:+919500207811"}
          />
        </div>
      </div>
    </section>
  );
};

export default Response;
