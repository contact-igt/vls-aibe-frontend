import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const WhatLearn = ({ whatlearn_constant }) => {
  return (
    <section className={styles.whatlearnSection}>
      <div className={styles.overlay}></div>
      <div className={styles.WhatLearnContent}>
        <div className="container">
          <Title title={"What You'll"} highlight={"Learn"} />
          <div className="row mt-5">
            {whatlearn_constant?.map((data, i) => (
              <div className="col-lg-6 d-flex justify-content-center">
                <div
                  key={i}
                  className={`${styles.learncard} d-flex align-items-center align-items-md-start gap-4`}
                >
                  <div className={styles.iconsec}>
                    <DynamicIcon name={data?.icon} color="#fff" size={40} />
                  </div>
                  <div className={styles.contentsec}>
                    <h4>{data?.title}</h4>
                    <p>{data?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatLearn;
