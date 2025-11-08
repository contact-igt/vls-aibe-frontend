import { BadgePercent } from "lucide-react";
import styles from "./styles.module.css";
import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
import { Popup } from "@/common/Popup";
import { useEffect, useState } from "react";
import Button from "@/common/Button";

const HomeBanner = ({ banner, handleToggleToForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [seatsLeft, setSeatsLeft] = useState(12);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 6 ? prev - 1 : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.homebanner_sec}>
      <div className={styles.bannerview}>
        <div
          className={`${styles.logoxgoogle} d-flex align-items-center gap-3 justify-content-center`}
        >
          <div className={`${styles.logoview}`}>
            <Image
              src={"/assets/vls_logo.png"}
              width={80}
              height={80}
              alt="logo"
            />
          </div>
          <div className={styles.line}></div>
          <div
            className={`${styles.googleview} d-flex align-items-center gap-2`}
          >
            <Image
              src={"/assets/google.png"}
              width={35}
              height={35}
              alt="logo"
            />
            <div className={styles.googleinfo}>
              <p className="m-0">Google</p>
              <h6 className="m-0">Top Best Academy</h6>
            </div>
          </div>
        </div>

        <div className={`${styles.mainview} mt-5 position-relative `}>
          <div className="d-flex justify-content-center text-center">
            <h4 className={styles.mainview1}>
              {" "}
              Clear <span> AIBE </span> With <span> Confidence </span> and{" "}
              <span> Master </span> The Bare Act
            </h4>
          </div>
          <div className="d-flex justify-content-center text-center mt-lg-4 mt-3">
            <p className={styles.mainview2}>{banner?.main.description}</p>
          </div>
          <div
            className={`${styles.slogan} position-absolute `}
            onClick={handleToggleToForm}
          >
            <p>No Stress, Only Strategy</p>
          </div>
        </div>

        <div className=" mt-3 d-flex justify-content-center">
          <Button
            name={"Get Started — Just ₹99"}
            bg_color={"#b20a0a"}
            name_color={"#fff"}
            onClick={handleToggleToForm}
            icon={"circle-check"}
            icon_color={"#fff"}
          />
        </div>

        <div className={`${styles.speakerview} `}>
          <div className="d-flex justify-content-center w-100">
            <div className={`${styles.imgbanner} position-relative`}>
              <img
                src={"/assets/aibeintro.png"}
                className="img-fluid"
                alt="banner-img"
              />
              <div className={styles.imggardient}></div>
              <div className={`${styles.imgtag} position-absolute`}>
                <h4>Mr. Sivakumar Sivaprakasam</h4>
                <h6>( Lawyer, Chennai High Court )</h6>
                <div
                  className={`${styles.tagpan} d-flex justify-content-start flex-wrap gap-2 align-items-center`}
                >
                  <p>Achieving Top Ranks</p>
                  <p>1200+ Candidates</p>
                  <p>Trained 250+ Aspirants</p>
                </div>
              </div>
              <button
                onClick={() => {
                  openModal(
                    "https://res.cloudinary.com/dd3olj1ax/video/upload/v1762354593/vls_aibeintro_r4ry9j.mp4"
                  );
                }}
                className={styles.playButton}
              >
                <DynamicIcon
                  name="play"
                  fill="#b20a0a"
                  color="#b20a0a"
                  size={25}
                />
              </button>
            </div>
          </div>

          <Popup open={isModalOpen} onClose={closeModal} variant="video">
            <button
              className={styles.closeButton}
              onClick={closeModal}
              style={{ float: "right", marginBottom: "10px" }}
            >
              ✖
            </button>

            {selectedVideo && (
              <video width="100%" height="500px" controls autoPlay>
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Popup>
        </div>

        <div
          className={`${styles.tagview} d-flex justify-content-center flex-wrap gap-4 mt-5 `}
        >
          {banner?.main?.tags?.map((data, i) => (
            <div
              key={i}
              className={`${styles.tagbox} d-flex align-items-center gap-2`}
              onClick={handleToggleToForm}
            >
              <DynamicIcon name={data?.icon} size={18} />
              <h6 className="m-0">
                {data?.id == "4"
                  ? `Only ${seatsLeft}${data?.title}`
                  : data?.title}
              </h6>
            </div>
          ))}
        </div>
{/* 
        <div className="mt-5 d-flex justify-content-center">
          <Button
            name={"Register For AIBE Course"}
            bg_color={"#b20a0a"}
            name_color={"#fff"}
            onClick={handleToggleToForm}
            icon={"circle-check"}
            icon_color={"#fff"}
          />
        </div> */}

        <div className="d-flex justify-content-center mt-5">
          <div
            className={`${styles.ratedbox} text-center `}
            onClick={handleToggleToForm}
          >
            <p>Google Ratings</p>

            <div className="d-flex align-items-center justify-content-center gap-3 my-3">
              <Image
                src={"/assets/google.png"}
                width={35}
                height={35}
                alt="logo"
              />

              <div className={styles.ratedinfo}>
                <p className="m-0">4.9/(820)</p>
                <h6 className="m-0">Reviews</h6>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <DynamicIcon
                name="star"
                size={15}
                color="#FDCC0D"
                fill="#FDCC0D"
              />
              <DynamicIcon
                name="star"
                size={15}
                color="#FDCC0D"
                fill="#FDCC0D"
              />
              <DynamicIcon
                name="star"
                size={15}
                color="#FDCC0D"
                fill="#FDCC0D"
              />
              <DynamicIcon
                name="star"
                size={15}
                color="#FDCC0D"
                fill="#FDCC0D"
              />
              <DynamicIcon
                name="star"
                size={15}
                color="#FDCC0D"
                fill="#FDCC0D"
              />
              <DynamicIcon
                name="star"
                size={15}
                color="#595957ff"
                fill="#595957ff"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
