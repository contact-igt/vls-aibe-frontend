import Button from "@/common/Button";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Form from "@/common/Form";

const HeroBanner = ({ herobanner_constant }) => {
  return (
    <section className={styles.heroBannerSection}>
      <div className={styles.overlay}></div>

      <div className={styles.herobannerContent}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 py-3 ">
              <div className={styles.heroBannerContent}>
                <h1 className={styles.heroBannerTitle}>
                  Clear <span> AIBE </span> By Decoding The <span> BARE </span>{" "}
                  Act
                </h1>
                <p className={styles.heroBannerDescription}>
                  {herobanner_constant?.description}
                </p>

                <div className={`${styles.bullet} my-5 `}>
                  {herobanner_constant?.bullet_points?.map((data, i) => (
                    <div
                      key={i}
                      className={`${styles.bulletpoint} d-flex align-items-center gap-3 mb-4`}
                    >
                      <DynamicIcon
                        name="circle-check"
                        color="#b20a0a"
                        size={25}
                      />
                      <p className="m-0">{data}</p>
                    </div>
                  ))}
                </div>

                <div className={`${styles.heroBannerCta} d-flex gap-4 pt-3`}>
                  <Button
                    name={"Book with ₹500"}
                    bg_color={"#b20a0a"}
                    name_color={"#ffff"}
                    icon={"notepad-text"}
                    btn_type={"button"}
                    icon_color={"#fff"}
                  />

                  <Button
                    name={"Chat on WhatsApp"}
                    bg_color={"#ffff"}
                    name_color={"#000"}
                    btn_type={"link"}
                    href={"http://wa.me/+919500025216"}
                    img={"/assets/whatsapp-icon.png"}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className={styles.bannerForm}>
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
