import Title from "@/common/Title";
import styles from "./styles.module.css";

const Decoding = ({ decoding_constant }) => {
  return (
    <section className={styles.decodingSection}>
      <Title
        title={decoding_constant?.title}
        highlight={decoding_constant?.highlight}
        subTitle={decoding_constant?.subTitle}
      />

      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-5">
          {decoding_constant?.data?.map((data, i) => (
            <div key={`decoding-${data?.id || i}`} className={styles.stepCard}>
              <div className="d-flex justify-content-center">
                <div className={styles.numcard}>
                  <h5>{data?.id}</h5>
                </div>
              </div>

              <h6>{data?.title}</h6>
              <p>{data?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Decoding;
