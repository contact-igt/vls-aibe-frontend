import Title from "@/common/Title";
import styles from "./styles.module.css";
import { SafeDynamicIcon as DynamicIcon } from "@/common/SafeDynamicIcon";
import Button from "@/common/Button";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import { isRegistrationOpen, getSectionCtaText } from "@/utils/programStatus";

const Schedule = ({
  schedule_constant,
  handleToggleToForm,
  config = defaultProgramConfig,
}) => {
  const isRegOpen = isRegistrationOpen(config);
  const ctaText = getSectionCtaText(
    config,
    schedule_constant?.cta || "Register Now"
  );

  const displayScheduleData = isRegOpen
    ? schedule_constant?.scheduleData || []
    : (schedule_constant?.scheduleData || [])
        .filter((item) => item.id !== 5 && item.title !== "Pricing")
        .map((item) => {
          if (item.title === "Date") {
            return { ...item, description: "Date to be announced" };
          }
          if (item.title === "Time") {
            return {
              ...item,
              description: "Time to be announced",
              description2: null,
            };
          }
          return item;
        });

  return (
    <section className={styles.scheduleSection}>
      <div className={styles.batchBanner}>
        {isRegOpen ? schedule_constant?.topLabel : "Batch Announcement Pending"}
      </div>

      <div className="container">
        <div className={styles.cardWrapper}>
          <h5 className={styles.title}>{schedule_constant?.title}</h5>
          <div className={styles.cardInner}>
            {displayScheduleData.map((item, index) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.iconWrap}>
                  <DynamicIcon name={item?.icon} color="#fff" />
                </div>

                <div className={styles.textWrap}>
                  <h6 className={styles.itemLabel}>{item.title}</h6>
                  <p className={styles.itemValue}>
                    {isRegOpen &&
                    displayScheduleData.length - 1 === index &&
                    item.description?.includes(" ") ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            opacity: 0.7,
                            fontSize: "0.9em",
                            marginRight: "5px",
                          }}
                        >
                          {item.description.split(" ")[0]}
                        </span>
                        {item.description.split(" ")[1]} - {item.description2}
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center mt-5">
        <Button
          onClick={handleToggleToForm}
          name={ctaText}
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
