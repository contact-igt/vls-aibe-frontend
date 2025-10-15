import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const WhosThis = ({ whosthis_constant }) => {
  return (
    <section className={styles.whosthisSection}>
      <Title
        title={"Who This"}
        highlight={"Is For"}
        subTitle={
          "Designed for serious aspirants who want to clear AIBE with clarity and focus"
        }
      />
      <div className="container">
        <div>
          {whosthis_constant?.map((data, i) => (
            <div
              className={`d-flex align-items-center justify-content-center gap-5 ${
                data?.id % 2 == "0" ? "flex-row-reverse" : ""
              } `}
            >
              <div className={styles.content}>
                <DynamicIcon name="graduation-cap" />
                <h4>{data?.title}</h4>
                <p>{data?.description}</p>
              </div>
              <div className={`${styles.Number} d-flex justify-content-center`}>
                <h4>{data?.id}</h4>
                <div className={styles.double_circle}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhosThis;
