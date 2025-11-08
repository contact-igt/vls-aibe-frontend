import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Button from "@/common/Button";

const Schedule = ({ schedule_constant, handleToggleToForm }) => {
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
                  {item.description2 && (
                    <p className={styles.itemValue}>{item.description2}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center mt-md-5 mt-4">
        <Button
          onClick={handleToggleToForm}
          name="Pay ₹99 Advance"
          icon={"circle-check"}
          icon_color={"#fff"}
          bg_color="rgb(178, 10, 10)"
          name_color="#fff"
        />
      </div>
    </section>
  );
};

export default Schedule;
