import AttemptFails from "@/component/Home/AttemptFails";
import Decoding from "@/component/Home/Decoding";
import FAQ from "@/component/Home/Faq/FAQ";
import Result from "@/component/Home/Result";
import Speaker from "@/component/Home/Speaker";
import WhatLearn from "@/component/Home/WhatLearn";
import WhosThis from "@/component/Home/WhosThis";
import Included from "@/component/Home/Included";
import Schedule from "@/component/Home/Schedule";
import WhatWeCover from "@/component/Home/WhatWeCover";
import { HomePageConstant, programConfig } from "@/constant/Home";
import { useEffect } from "react";
import { TrainingSession } from "@/component/Home/TrainingSession";
import Testimonial from "@/component/Home/testimonial";
import HomeBanner from "@/component/Home/HomeBanner";
import Form from "@/common/Form";
import styles from "./styles.module.css";

const HomePageComponent = () => {
  const scrollToForm = () => {
    const form = document.getElementById("aibe-enquiry");
    const heading = document.getElementById("aibe-enquiry-title");
    heading?.focus({ preventScroll: true });
    form?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    localStorage.removeItem("PaymentDeatls");
  }, []);

  return (
    <>
      <HomeBanner
        banner={HomePageConstant?.homeBanner}
        config={programConfig}
      />
      <TrainingSession
        trainingsession_constant={HomePageConstant?.trainingSession}
        handleToggleToForm={scrollToForm}
      />
      <WhatWeCover
        whatwecover_constant={HomePageConstant?.whatWeCover}
        handleToggleToForm={scrollToForm}
      />
      <Testimonial handleToggleToForm={scrollToForm} />

      <Speaker speaker_constant={HomePageConstant?.speaker} />
      <Result
        result_constant={HomePageConstant?.proven_result}
        handleToggleToForm={scrollToForm}
      />
      <AttemptFails
        attempt_constant={HomePageConstant?.attemptFails}
        handleToggleToForm={scrollToForm}
      />
      <WhatLearn
        whatlearn_constant={HomePageConstant?.whatLearn}
        cta_text={HomePageConstant?.whatLearn_cta}
        handleToggleToForm={scrollToForm}
      />
      <WhosThis whosthis_constant={HomePageConstant?.whosThis} handleToggleToForm={scrollToForm}/>
      <Decoding decoding_constant={HomePageConstant?.decode} />
      <Schedule schedule_constant={HomePageConstant?.schedule} handleToggleToForm={scrollToForm} config={programConfig} />
      <Included
        included_constant={HomePageConstant?.included}
        handleToggleToForm={scrollToForm}
      />
      <FAQ faqs={HomePageConstant?.Faq} config={programConfig} />
      <section className={styles.enquirySection} aria-labelledby="bottom-enquiry-title">
        <div className={styles.enquiryGrid}>
          <div className={styles.enquiryContent}>
            <p className={styles.eyebrow}>PREPARE WITH CLARITY</p>
            <h2 id="bottom-enquiry-title">Take the Next Step in Your <span>AIBE Preparation.</span></h2>
            <p className={styles.enquiryDescription}>
              Learn to decode the Bare Act, find the right sections faster, and
              approach AIBE with a clear strategy. Explore practical preparation
              with VLS Law Academy.
            </p>
            <ul className={styles.enquiryBenefits}>
              <li>Bare Act guidance and answer-finding methods</li>
              <li>AIBE-style practice questions</li>
              <li>Practical exam and time-management strategies</li>
            </ul>
            <div className={styles.enquiryContact}>
              <p>Prefer to talk?</p>
              <div className={styles.phoneLinks}>
                <a href={`tel:${programConfig.whatsapp}`}>+91 95000 25216</a>
                <a href={`tel:${programConfig.phone1}`}>+91 95002 07811</a>
              </div>
              <a
                className={styles.whatsappLink}
                href={`https://wa.me/${programConfig.whatsapp.replace(/\D/g, "")}?text=AIBE`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.enquiryPanel} data-enquiry-form aria-labelledby="bottom-form-title">
            <h3 id="bottom-form-title">Get guidance for your next step</h3>
            <Form config={programConfig} idPrefix="bottom-lead" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageComponent;
