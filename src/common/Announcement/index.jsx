import styles from "./styles.module.css";
import { programConfig as defaultProgramConfig } from "@/constant/Home";
import { getMarqueeText, isRegistrationOpen } from "@/utils/programStatus";

const Announcement = ({ announce, config = defaultProgramConfig }) => {
  const marqueeText = getMarqueeText(config);
  const isRegOpen = isRegistrationOpen(config);

  return (
    <div className={styles.marquee_box}>
      <div className={styles.marquee_inner}>
        <span>{marqueeText}</span>
        {isRegOpen && announce?.offer && (
          <span className={styles.offer}>{announce?.offer}</span>
        )}
        <span>{marqueeText}</span>
        {isRegOpen && announce?.offer && (
          <span className={styles.offer}>{announce?.offer}</span>
        )}
      </div>
    </div>
  );
};

export default Announcement;
