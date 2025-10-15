import styles from "./styles.module.css";

const Title = ({ title, subTitle, highlight }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        {title} <span className={styles.titleAccent}>{highlight}</span>
      </h2>
      <div className={styles.divider}></div>
      <p>{subTitle}</p>
    </div>
  );
};

export default Title;
