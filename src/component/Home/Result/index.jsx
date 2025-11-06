import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Button from "@/common/Button";

const Result = ({ result_constant, handleToggleToForm }) => {
  return (
    <section className={styles.resultSection}>
      <Title title={"Proven"} highlight={"Results"} />

      <div className="container">
        <div
          className={`${styles.Result} d-flex flex-wrap justify-content-center gap-5`}
        >
          {result_constant?.result?.map((data, i) => (
            <div className={styles.resultCard}>
              <div className={styles.cardIcon}>
                <DynamicIcon name={data?.icon} size={40} />
              </div>
              <h6>{data?.number}</h6>
              <p>{data?.type}</p>
            </div>
          ))}
        </div>

        <div className="mt-md-5 mt-4 d-flex justify-content-center">
          <Button
            name={"Enroll Your Seat Now"}
            bg_color={"#b20a0a"}
            name_color={"#fff"}
            onClick={handleToggleToForm}
            icon={"circle-check"}
            icon_color={"#fff"}
          />
        </div>

        {/* <div className="d-flex justify-content-center">
          <div className={styles.Proven}>
            {result_constant?.proven?.map((data, i) => (
              <div
                key={i}
                className={`${styles.bulletpoint} d-flex align-items-center gap-3 my-4`}
              >
                <DynamicIcon name="circle-check" color="#b20a0a" size={25} />
                <p className="m-0">{data}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Result;
