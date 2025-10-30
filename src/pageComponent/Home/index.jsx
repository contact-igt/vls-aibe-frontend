import RegisterSticky from "@/common/RegisterSticky";
import AttemptFails from "@/component/Home/AttemptFails";
import Decoding from "@/component/Home/Decoding";
import FAQ from "@/component/Home/Faq/FAQ";
import HeroBanner from "@/component/Home/HeroBanner";
import Result from "@/component/Home/Result";
import Speaker from "@/component/Home/Speaker";
import WhatLearn from "@/component/Home/WhatLearn";
import WhosThis from "@/component/Home/WhosThis";
import Included from "@/component/Home/Included";
import Schedule from "@/component/Home/Schedule";
import WhatWeCover from "@/component/Home/WhatWeCover";
import { HomePageConstant } from "@/constant/Home";
import { useEffect, useRef } from "react";
import { TrainingSession } from "@/component/Home/TrainingSession";

const HomePageComponent = () => {
  const contactRef = useRef(null);

  const scrollToContactForm = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

    const handleScrollToCover = () => {
    const addressSection = document.getElementById("coversection");
    if (addressSection) {
      addressSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    localStorage.removeItem("PaymentDeatls");
  }, []);

  return (
    <>
      <HeroBanner
        scrollToContactForm={scrollToContactForm}
        ref={contactRef}
        herobanner_constant={HomePageConstant?.homeBanner}
      />
      <AttemptFails attempt_constant={HomePageConstant?.attemptFails} handleScrollToCover={handleScrollToCover} />
      <WhatLearn whatlearn_constant={HomePageConstant?.whatLearn} />
      <TrainingSession trainingsession_constant={HomePageConstant?.trainingSession} />
      <WhosThis whosthis_constant={HomePageConstant?.whosThis} />
      <Decoding decoding_constant={HomePageConstant?.decode} />
      <Schedule schedule_constant={HomePageConstant?.schedule} />
      <Included included_constant={HomePageConstant?.included} />
      <WhatWeCover whatwecover_constant={HomePageConstant?.whatWeCover}  />
      <Result result_constant={HomePageConstant?.proven_result} />
      <Speaker speaker_constant={HomePageConstant?.speaker} />
      <FAQ faqs={HomePageConstant?.Faq} />
      <RegisterSticky scrollToContactForm={scrollToContactForm} />
    </>
  );
};

export default HomePageComponent;
