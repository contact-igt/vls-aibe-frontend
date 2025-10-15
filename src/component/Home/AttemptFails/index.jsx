import Title from "@/common/Title";
import styles from "./styles.module.css";
import Button from "@/common/Button";
import { XCircle } from "lucide-react";

const AttemptFails = ({ attempt_constant }) => {
  return (
    <section className={styles.attemptSection}>
      <Title title={"Why Most AIBE"} highlight={"Attempts Fail"} />
      <div className={styles.attemptContainer}>
        <div className={styles.attempt_fails_left}>
          <ul>
            {attempt_constant?.map((fail, index) => (
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
          <Button
            name="See the Method"
            bg_color={"#b20a0a"}
            name_color={"#fff"}
            className={styles.see_method_btn}
            btn_type={"button"}
            icon={"circle-chevron-down"}
            icon_color={"#fff"}
          />
        </div>
        <div className={styles.attempt_fails_right}>
          {/* You can add an image here */}
          <img
            src="assets/abie-fail.avif"
            alt="AIBE Preparation"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default AttemptFails;
