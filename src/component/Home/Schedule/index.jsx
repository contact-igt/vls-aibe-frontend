import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const Schedule = ({ schedule_constant }) => {

  return (
    <section className={styles.scheduleSection}>
      <div className={styles.batchBanner}>This Batch Only</div>

      <div className="container">
        <div className={styles.cardWrapper}>
            <h5 className={styles.title}>{schedule_constant?.title}</h5>
          <div className={styles.cardInner}>
            {schedule_constant?.scheduleData?.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.iconWrap}>
                  <DynamicIcon name={item?.icon} color="#fff" />
                </div>

                <div className={styles.textWrap}>
                  <h6 className={styles.itemLabel}>{item.title}</h6>
                  <p className={styles.itemValue}>{item.description}</p>
                  {item.description2 && <p className={styles.itemValue}>{item.description2}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;