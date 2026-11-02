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
      const stored =
        localStorage.getItem("PaymentDeatls") ||
        localStorage.getItem("PaymentDetails");
      if (stored) {
        setuserDeatil(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse stored details", e);
    }
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
            {issuccess ? "Thank You! Details Received" : "Submission Failed"}
          </h5>

          {issuccess ? (
            <>
              <p className="mt-3">
                Your enquiry has been successfully received.
              </p>
              <p className="text-muted mt-2">
                Our academic counselor will get in touch with you via Phone or
                WhatsApp to guide you with the right AIBE preparation strategy.
              </p>
              <p className="fw-semibold mt-3 text-success">
                Thank you for connecting with VLS Law Academy! 🚀
              </p>
              {userDetail && (
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Submitted Details:</strong>
                  </p>
                  <p>
                    <strong>Full Name:</strong>{" "}
                    {userDetail["Full Name"] || userDetail.Name || userDetail.name || "-"}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong>{" "}
                    {userDetail["Mobile Number"] || userDetail.Mobile || userDetail.mobile || "-"}
                  </p>
                  <p>
                    <strong>Email Address:</strong>{" "}
                    {userDetail["Email Address"] || userDetail.Email || userDetail.email || "-"}
                  </p>
                  {(userDetail["Have you completed your LLB?"] || userDetail.completed_llb) && (
                    <p>
                      <strong>LLB Status:</strong>{" "}
                      {userDetail["Have you completed your LLB?"] || userDetail.completed_llb}
                    </p>
                  )}
                  {(userDetail["Which AIBE exam are you preparing for?"] || userDetail.aibe_exam) && (
                    <p>
                      <strong>Target Exam:</strong>{" "}
                      {userDetail["Which AIBE exam are you preparing for?"] || userDetail.aibe_exam}
                    </p>
                  )}
                  {(userDetail["What type of AIBE preparation are you looking for?"] || userDetail.preparation_type) && (
                    <p>
                      <strong>Preparation Type:</strong>{" "}
                      {userDetail["What type of AIBE preparation are you looking for?"] || userDetail.preparation_type}
                    </p>
                  )}
                  {(userDetail["When would you like to start your preparation?"] || userDetail.start_timeline) && (
                    <p>
                      <strong>Start Timeline:</strong>{" "}
                      {userDetail["When would you like to start your preparation?"] || userDetail.start_timeline}
                    </p>
                  )}
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success text-white">Submitted</span>
                  </p>
                </div>
              )}
            </>
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
