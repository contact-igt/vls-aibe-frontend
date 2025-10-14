import styles from "./styles.module.css";

const Title = ({ title, subTitle, highlight }) => {
  return (
    <div className={styles.commnTitle}>
      <h2>
        {title}
        <span style={{ color: "#B20A0A" }}> {highlight}</span>
      </h2>
      {subTitle && <p>{subTitle}</p>}
    </div>
  );
};

export default Title;
