import { useState } from "react";
import Image from "next/image";
import { SafeDynamicIcon as DynamicIcon } from "@/common/SafeDynamicIcon";
import { Popup } from "@/common/Popup";
import Form from "@/common/Form";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import { isRegistrationOpen } from "@/utils/programStatus";
import styles from "./styles.module.css";

const HomeBanner = ({ banner, config = defaultProgramConfig }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isRegOpen = isRegistrationOpen(config);
  const displayTags = isRegOpen
    ? banner?.main?.tags || []
    : [
        { icon: "calendar", title: "Next Batch Announcement Coming Soon" },
        { icon: "locate-fixed", title: config?.mode || "Both Online / Offline" },
        { icon: "languages", title: config?.language || "English / Tamil" },
      ];

  return (
    <section className={styles.hero} aria-labelledby="aibe-hero-title">
      <div className={styles.container}>
        <div className={styles.brandRow}>
          <a href="https://www.vlslawacademy.com/" aria-label="VLS Law Academy home">
            <Image src="/assets/vls_logo.png" width={76} height={76} alt="VLS Law Academy" priority />
          </a>
          <span className={styles.brandDivider} aria-hidden="true" />
          <div className={styles.brandText}>
            <strong>VLS Law Academy</strong>
            <span>AIBE Exam Preparation</span>
          </div>
          <div className={styles.googleRating}>
            <Image src="/assets/google.png" width={28} height={28} alt="Google" />
            <div><strong>4.9 / 5</strong><span>820 reviews</span></div>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>AIBE INTENSIVE MASTERCLASS</p>
            <h1 id="aibe-hero-title" className={styles.title}>
              Clear <span>AIBE</span> With <span>Confidence</span> and Master The Bare Act
            </h1>
            <p className={styles.description}>{banner?.main?.description}</p>
            <div className={styles.facts}>
              <span><DynamicIcon name="clock" size={17} /> {config?.duration || "20 Hours"} Intensive Training</span>
              <span><DynamicIcon name="book-open" size={17} /> Training + Test Questions</span>
            </div>

            <div className={styles.speakerCard}>
              <div className={styles.imageFrame}>
                <Image
                  src="/assets/aibeintro.png"
                  alt="Dr. Sivakumar introducing the AIBE masterclass"
                  width={700}
                  height={400}
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.speakerImage}
                  priority
                />
                <button type="button" className={styles.playButton} onClick={() => setIsVideoOpen(true)} aria-label="Play AIBE introduction video">
                  <DynamicIcon name="play" fill="currentColor" size={22} />
                </button>
              </div>
              <div className={styles.speakerCaption}>
                <div><h2>Dr. Sivakumar</h2><p>Lawyer, Chennai High Court</p></div>
                <span className={styles.slogan}>No Confusion, Only Clarity</span>
              </div>
              <div className={styles.topics}>
                <span>Practical AIBE Strategy</span><span>Bare Act Guidance</span><span>Clear Exam Strategy</span>
              </div>
            </div>

            <div className={styles.tags}>
              {displayTags.map((tag, index) => (
                <div className={styles.tag} key={tag.id || index}>
                  <DynamicIcon name={tag.icon} size={18} />
                  <span>{tag.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="aibe-enquiry" data-enquiry-form className={styles.formPanel} aria-labelledby="aibe-enquiry-title">
            <p className={styles.eyebrow}>TAKE THE NEXT STEP</p>
            <h2 id="aibe-enquiry-title" tabIndex={-1}>Start your AIBE preparation</h2>
            <Form config={config} />
          </div>
        </div>
      </div>
      <Popup open={isVideoOpen} onClose={() => setIsVideoOpen(false)} variant="video">
        <video className={styles.video} controls autoPlay aria-label="AIBE masterclass introduction">
          <source src="https://res.cloudinary.com/dd3olj1ax/video/upload/v1762354593/vls_aibeintro_r4ry9j.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Popup>
    </section>
  );
};

export default HomeBanner;
