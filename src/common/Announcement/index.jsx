import styles from "./styles.module.css";

const Announcement = ({ announce }) => {
  return (
    <div className={styles.marquee_box}>
      <div className={styles.marquee_inner}>
        <span>{announce?.title}</span>
        <span className={styles.offer}>{announce?.offer}</span>
        <span>{announce?.title}</span>
        <span className={styles.offer}>{announce?.offer}</span>
      </div>
    </div>
  );
};

export default Announcement;
