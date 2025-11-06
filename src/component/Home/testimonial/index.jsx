import React, { useState } from "react";
import styles from "./styles.module.css";
import Title from "@/common/Title";
import Button from "@/common/Button";
import { Popup } from "@/common/Popup";
import Slider from "react-slick";
import TestimonialCard from "@/common/TestimonialCard";

const Testimonial = ({ handleToggleToForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };
  const testimonialData = [
    {
      name: "Balakrishnan",
      description:
        "I’m Balakrishnan from Chennai. After retiring from the Customs and Excise Department, I pursued my LLB and enrolled in 2023. I initially couldn’t clear my AIB exam, but after joining VLS Law Academy, the guidance and structured training helped me succeed. I’m proud to be a student of VLS — this achievement wouldn’t have been possible without their support.",
      imgUrl: "/assets/testimonialimg1.png",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892069/vls-testimonal2_hijanx.mp4",
    },
    {
      imgUrl: "/assets/testimonialimg2.png",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1762343697/vls_testimonal4_fmdamk.mp4",
    },
    {
      name: "Our Students",
      description:
        "Hi, I’m Akshara Prithashini. I’ve been practicing in Ooty for the past two years. When I first came to Chennai, I was completely unsure about where to start — joining VLS Law Academy gave me the right direction and confidence to build my practice.",
      imgUrl: "/assets/testimonialimg3.jpg",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4",
    },
    {
      name: "R.Jedidiah",
      description:
        "Hi Everyone, I’m R.Jedidiah. Being part of VLS Law Academy’s Decoding of Practice course has been an incredible experience. I learned how to apply legal theory to real-world situations, and it’s truly boosted my confidence as a law student.",
      imgUrl: "/assets/testimonialimg4.png",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4",
    },
  ];

  var settings = {
    dots: false,
    infinite: false,
    arrows: true,
    loop: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 500,
    centerMode: testimonialData.length === 1,
    centerPadding: "0px",
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: testimonialData.length === 1,
          centerPadding: "0px",
          infinite: false,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1.7,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false,
           centerMode: testimonialData.length === 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          initialSlide: 1,
           centerMode: testimonialData.length === 1,
          centerPadding: "0px",
          infinite: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "0px",
          infinite: false,
        },
      },
    ],
  };

  return (
    <section className={styles.testimonalsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title={"Our Student"} highlight={"Testimonals"} />
        </div>

        <div className={styles.testimonialContainer}>
          <Slider
            // key={slidesToShow + (centerMode ? "c" : "")}
            {...settings}
            className={styles.sliderWrapper}
          >
            {testimonialData?.map((item, index) => (
              <div key={index} className={styles.slideWrapperItem}>
                <TestimonialCard
                  imageSrc={item?.imgUrl}
                  openModal={() => openModal(item.videoUrl)}
                  name={item?.name}
                  testimonial={item?.description}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-100 d-flex justify-content-center mt-5">
          <Button
            onClick={handleToggleToForm}
            name="Reserve My Seat"
            icon={"circle-check"}
            icon_color={"#fff"}
            bg_color="rgb(178, 10, 10)"
            name_color="#fff"
          />
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
    </section>
  );
};

export default Testimonial;
