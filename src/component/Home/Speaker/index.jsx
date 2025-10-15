import Title from "@/common/Title";
import styles from "./styles.module.css";
const Speaker = ({ speaker_constant }) => {
  return (
    <section className={styles.speakersec}>
      <div className={`container ${styles.container}`}>
        <div className="d-flex justify-content-center">
          <Title title={"Our"} highlight={"Mentors"} />
        </div>

        <div className={`${styles.speakercard}`}>
          <div className="row">
            <div className="col-lg-6 order-2 order-lg-1 pt-lg-4">
              <div
                className={`${styles.speakerimg} d-flex justify-content-center ${styles.firstImage}`}
              >
                <img src={speaker_constant[0]?.image} className="img-fluid" />
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2">
              <div className={styles.speakerinfo}>
                <h3>{speaker_constant[0]?.name}</h3>
                <h4>{speaker_constant[0]?.Education}</h4>
                 <h5>{speaker_constant[0]?.position}</h5>
                <p>{speaker_constant[0]?.about}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.speakercard} mt-5`}>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.speakerinfo}>
                <h3>{speaker_constant[1]?.name}</h3>
                <h4>{speaker_constant[1]?.Education}</h4>
                 <h5>{speaker_constant[1]?.position}</h5>
                <p>{speaker_constant[1]?.about}</p>
              </div>
            </div>
            <div className="col-lg-6 pt-lg-4">
              <div className={`${styles.speakerimg} d-flex justify-content-center`}>
                <img src={speaker_constant[1]?.image} className={`${styles.secondImage} img-fluid`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speaker;
