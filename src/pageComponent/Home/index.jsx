import RegisterSticky from "@/common/RegisterSticky";
import AttemptFails from "@/component/Home/AttemptFails";
import Decoding from "@/component/Home/Decoding";
import FAQ from "@/component/Home/Faq/FAQ";
import HeroBanner from "@/component/Home/HeroBanner";
import Result from "@/component/Home/Result";
import Speaker from "@/component/Home/Speaker";
import WhatLearn from "@/component/Home/WhatLearn";
import WhosThis from "@/component/Home/WhosThis";
import { HomePageConstant } from "@/constant/Home";

const HomePageComponent = () => {
  return (
    <>
      <HeroBanner herobanner_constant={HomePageConstant?.homeBanner} />
      <AttemptFails attempt_constant={HomePageConstant?.attemptFails} />
      <WhatLearn whatlearn_constant={HomePageConstant?.whatLearn} />
      <WhosThis whosthis_constant={HomePageConstant?.whosThis}/>
      <Decoding decoding_constant={HomePageConstant?.decode} />
      <Result result_constant={HomePageConstant?.proven_result} />
      <Speaker speaker_constant={HomePageConstant?.speaker} />
      <FAQ faqs={HomePageConstant?.Faq}/>
      <RegisterSticky/>
    </>
  );
};

export default HomePageComponent;
