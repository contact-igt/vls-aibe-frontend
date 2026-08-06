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
      setIsSuccess(
        router.pathname === "/thank-you" || router.query.response === "thank-you"
      );
    }
  }, [router.isReady, router.pathname, router.query.response]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("PaymentDeatls") || localStorage.getItem("PaymentDetails");
      if (stored) {
        setuserDeatil(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse PaymentDeatls", e);
    }
  }, []);

  const isWaitlist =
    userDetail?.Payment_Status === "waitlist" ||
    userDetail?.payment_status === "waitlist";

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
            {issuccess
              ? isWaitlist
                ? "Thank You - Joined Waitlist!"
                : "Thank You for Your Booking!"
              : "Booking Failed"}
          </h5>

          {issuccess ? (
            isWaitlist ? (
              <>
                <p className="mt-3">
                  Your entry for the waitlist has been successfully received.
                </p>
                <p className="text-muted mt-2">
                  Our team will contact you via Email or WhatsApp as soon as dates and pricing for the next batch are finalized.
                </p>
                <p className="fw-semibold mt-3 text-success">
                  Thank you for your interest in VLS Law Academy! 🚀
                </p>
                {userDetail && (
                  <div className={styles.summaryBox}>
                    <p>
                      <strong>Waitlist Entry Details:</strong>
                    </p>
                    <p>
                      <strong>Name:</strong> {userDetail.Name || userDetail.name || "-"}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetail.Email || userDetail.email || "-"}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {userDetail.Mobile || userDetail.mobile || "-"}
                    </p>
                    <p>
                      <strong>Status:</strong> <span className="badge bg-warning text-dark">Waitlisted</span>
                    </p>
                  </div>
                )}
              </>
            ) : (
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
                {userDetail && (
                  <div className={styles.summaryBox}>
                    <p>
                      <strong>Booking Details:</strong>
                    </p>
                    <p>
                      <strong>Name:</strong> {userDetail.Name || userDetail.name || "-"}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetail.Email || userDetail.email || "-"}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {userDetail.Mobile || userDetail.mobile || "-"}
                    </p>
                    {userDetail.Amount && (
                      <p>
                        <strong>Amount:</strong> ₹{userDetail.Amount}
                      </p>
                    )}
                    {userDetail.Razorpay_Transaction_Id && userDetail.Razorpay_Transaction_Id !== "N/A" && (
                      <p>
                        <strong>Transaction ID:</strong> {userDetail.Razorpay_Transaction_Id}
                      </p>
                    )}
                  </div>
                )}
              </>
            )
          ) : (
            <p>
              Oops! We couldn't process your request. Please try again or call
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
