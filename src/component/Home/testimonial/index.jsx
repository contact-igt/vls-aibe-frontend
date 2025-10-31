import React, { useState } from "react";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Title from "@/common/Title";

const Testimonial = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.testimonalsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title={"Our Student"} highlight={"Testimonals"} />
        </div>

        <div className={`${styles.testim0nalcard} mt-5`}>
          {isOpen ? (
            <div className={styles.testimonal_video}>
              <video src="https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892069/vls-testimonal2_hijanx.mp4" controls autoPlay playsInline></video>
            </div>
          ) : (
            <div
              className={styles.testimonal_thumbnail}
              onClick={() => setIsOpen(true)}
            >
              <div className={styles.playbtn}>
                <DynamicIcon name="play" color="#fff" size={40} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
