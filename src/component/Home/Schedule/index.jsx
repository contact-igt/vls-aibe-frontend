import Title from "@/common/Title";
import styles from "./styles.module.css";
import { SafeDynamicIcon as DynamicIcon } from "@/common/SafeDynamicIcon";
import Button from "@/common/Button";

const Schedule = ({ schedule_constant, handleToggleToForm }) => {
  return (
    <section className={styles.scheduleSection}>
      <div className={styles.batchBanner}>{schedule_constant?.topLabel}</div>

      <div className="container">
        <div className={styles.cardWrapper}>
          <h5 className={styles.title}>{schedule_constant?.title}</h5>
          <div className={styles.cardInner}>
            {schedule_constant?.scheduleData?.map((item, index) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.iconWrap}>
                  <DynamicIcon name={item?.icon} color="#fff" />
                </div>

                <div className={styles.textWrap}>
                  <h6 className={styles.itemLabel}>{item.title}</h6>
                  <p className={styles.itemValue}>
                    {schedule_constant?.scheduleData?.length - 1 === index && item.description?.includes(" ") ? (
                      <>
                        <span style={{ textDecoration: "line-through", opacity: 0.7, fontSize: '0.9em', marginRight: '5px' }}>
                          {item.description.split(" ")[0]}
                        </span>
                        {item.description.split(" ")[1]} - {item.description2}
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                  {/* {item.description2 && (
                    <p className={styles.itemValue}>{item.description2}</p>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center mt-5">
        <Button
          onClick={handleToggleToForm}
          name={schedule_constant?.cta || "Pay ₹499 Advance"}
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
