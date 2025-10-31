import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Button from "@/common/Button";

const WhatWeCover = ({ whatwecover_constant, scrollToContactForm }) => {
  return (
    <section className={styles.coverSection} id="coversection">
      <div className="container">
        <Title title={"What We"} highlight={"Cover"} />

        <div className={styles.timeline}>
          {whatwecover_constant?.WhatWeCoverList?.map((data, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>{`Module ${
                    index + 1
                  }`}</span>
                </div>
                <h4 className={styles.cardTitle}>{data?.title}</h4>
                <p className={styles.cardDesc}>{data?.description}</p>
              </div>

              {index !== whatwecover_constant?.WhatWeCoverList.length - 1 && (
                <div className={styles.connector}>
                  <span className={styles.connectorIcon}>
                    <DynamicIcon name="arrow-down" color="#fff" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-100 d-flex justify-content-center mt-5">
          <Button
            onClick={scrollToContactForm}
            name="Enroll with ₹199"
            icon={"circle-check"}
            icon_color={"#fff"}
            bg_color="rgb(178, 10, 10)"
            name_color="#fff"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeCover;
