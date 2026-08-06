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
import { HomePageConstant, programConfig } from "@/constant/Home";
import { useEffect, useRef, useState } from "react";
import { TrainingSession } from "@/component/Home/TrainingSession";
import Testimonial from "@/component/Home/testimonial";
import HomeBanner from "@/component/Home/HomeBanner";
import { Popup } from "@/common/Popup";
import Form from "@/common/Form";

const HomePageComponent = () => {
  const [isopen, setisopen] = useState(false);

  const handleToggleToForm = () => {
    setisopen(!isopen);
  };

  useEffect(() => {
    localStorage.removeItem("PaymentDeatls");
  }, []);

  return (
    <>
      <HomeBanner
        banner={HomePageConstant?.homeBanner}
        handleToggleToForm={handleToggleToForm}
        config={programConfig}
      />
      <TrainingSession
        trainingsession_constant={HomePageConstant?.trainingSession}
        handleToggleToForm={handleToggleToForm}
      />
      <WhatWeCover
        whatwecover_constant={HomePageConstant?.whatWeCover}
        handleToggleToForm={handleToggleToForm}
      />
      <Testimonial handleToggleToForm={handleToggleToForm} />

      <Speaker speaker_constant={HomePageConstant?.speaker} />
      <Result
        result_constant={HomePageConstant?.proven_result}
        handleToggleToForm={handleToggleToForm}
      />
      <AttemptFails
        attempt_constant={HomePageConstant?.attemptFails}
        handleToggleToForm={handleToggleToForm}
      />
      <WhatLearn
        whatlearn_constant={HomePageConstant?.whatLearn}
        cta_text={HomePageConstant?.whatLearn_cta}
        handleToggleToForm={handleToggleToForm}
      />
      <WhosThis whosthis_constant={HomePageConstant?.whosThis} handleToggleToForm={handleToggleToForm}/>
      <Decoding decoding_constant={HomePageConstant?.decode} />
      <Schedule schedule_constant={HomePageConstant?.schedule} handleToggleToForm={handleToggleToForm} config={programConfig} />
      <Included
        included_constant={HomePageConstant?.included}
        handleToggleToForm={handleToggleToForm}
      />
      <FAQ faqs={HomePageConstant?.Faq} config={programConfig} />
      <RegisterSticky handleToggleToForm={handleToggleToForm} config={programConfig} />
      <Popup open={isopen} onClose={handleToggleToForm}>
        <Form config={programConfig} />
      </Popup>
    </>
  );
};

export default HomePageComponent;
