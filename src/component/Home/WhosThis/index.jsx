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
              key={i}
              className={`${styles.whosthisItem} ${
                data?.id % 2 == "0" ? styles.reverse : ""
              }`}
            >
              <div className={styles.content}>
                <DynamicIcon name={data?.icon} size={50} color="#b20a0a" />
                <h4>{data?.title}</h4>
                <p>{data?.description}</p>
              </div>
              <div className={styles.Number}>
                <h4>{data?.id}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhosThis;
