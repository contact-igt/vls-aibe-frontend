import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const Included = ({ included_constant, handleToggleToForm }) => {
  return (
    <section className={styles.includedSection}>
      <div className="container">
        <Title
          title={"Everything Included in"}
          highlight={"25 Hours"}
          subTitle=""
        />

        <div className={styles.grid}>
          {included_constant?.includedData?.map((item) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.icon}>
                <DynamicIcon
                  name={item?.icon || "check-circle-2"}
                  color="#b20a0a"
                  size={32}
                />
              </div>
              <div>
                <h6 className={styles.cardTitle}>{item.title}</h6>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {included_constant?.tagData?.length ? (
          <div className={styles.includedTags}>
            {included_constant?.tagData?.map((item, index) => (
              <div
                className={styles.tag}
                key={index}
                onClick={handleToggleToForm}
              >
                <span className={styles.tagIcon}>
                  <DynamicIcon
                    name={"badge-check"}
                    fill="#0000"
                    color="#ffff"
                  />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Included;
