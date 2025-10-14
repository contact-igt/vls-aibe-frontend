import Title from "@/common/Title";
import styles from "./styles.module.css";
import Button from "@/common/Button";
import { XCircle } from "lucide-react";

const fails = [
  {
    title: "Reading cover to cover:",
    description: "Wasting time on low-yield sections instead of focusing on frequently tested topics",
  },
  {
    title: "No section recall strategy:",
    description: "Unable to quickly identify which Act and section applies under exam pressure",
  },
  {
    title: "Skipping timed practice:",
    description: "Knowing the law but running out of time during the actual exam",
  },
  {
    title: "Lack of structured method:",
    description: "Studying randomly without a clear plan or proven framework",
  },
];

const AttemptFails = () => {
  return (
    <section className={styles.attemptSection}>
      <Title title={"Why Most AIBE"} highlight={"Attempts Fail"} />
      <div className={styles.attemptContainer}>
        <div className={styles.attempt_fails_left}>
          <ul>
            {fails.map((fail, index) => (
              <li key={index}>
                <div className={styles.fail_item}>
                  <XCircle className={styles.fail_icon} />
                  <div>
                    <strong>{fail.title}</strong>
                    <p>{fail.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Button name="See the Method" bg_color={"#b20a0a"} name_color={"#fff"} className={styles.see_method_btn} />
        </div>
        <div className={styles.attempt_fails_right}>
          {/* You can add an image here */}
          <img src="assets/abie-fail.avif" alt="AIBE Preparation" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default AttemptFails;
