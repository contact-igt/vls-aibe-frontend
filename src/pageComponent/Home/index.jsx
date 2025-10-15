import AttemptFails from "@/component/Home/AttemptFails";
import Decoding from "@/component/Home/Decoding";
import HeroBanner from "@/component/Home/HeroBanner";
import WhatLearn from "@/component/Home/WhatLearn";
import { HomePageConstant } from "@/constant/Home";

const HomePageComponent = () => {
  return (
    <>
      <HeroBanner herobanner_constant={HomePageConstant?.homeBanner} />
      <AttemptFails attempt_constant={HomePageConstant?.attemptFails} />
      <WhatLearn whatlearn_constant={HomePageConstant?.whatLearn}/>
      <Decoding decoding_constant={HomePageConstant?.decode}/>
    </>
  );
};

export default HomePageComponent;
