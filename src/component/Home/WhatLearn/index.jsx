import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const WhatLearn = ({ whatlearn_constant }) => {
  return (
    <section className={styles.whatlearnSection}>
      <div className="container">
        <Title title={"What You'll"} highlight={"Learn"} />
        <div className="row">
          {whatlearn_constant?.map((data, i) => (
            <div className="col-lg-6 d-flex justify-content-center">
              <div key={i} className={styles.learncard}>
                <div className={styles.iconsec}>
                  <DynamicIcon name={data?.icon} color="#000" size={30} />
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
    </section>
  );
};

export default WhatLearn;
