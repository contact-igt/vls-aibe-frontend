import Title from "@/common/Title";
import styles from "./styles.module.css";

const Decoding = ({ decoding_constant }) => {
  return (
    <section className={styles.decodingSection}>
      <Title
        title={"The 3-Step BARE Act"}
        highlight={"Decoding System"}
        subTitle={
          "If you can decode 65 questions and mark the correct section references, you clear"
        }
      />

      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-5">
          {decoding_constant?.map((data, i) => (
            <div className={styles.stepCard}>
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
