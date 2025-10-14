import AttemptFails from "@/component/Home/AttemptFails";
import HeroBanner from "@/component/Home/HeroBanner";
import { HomePageConstant } from "@/constant/Home";

const HomePageComponent = () => {
  return(
    <>

    <HeroBanner herobanner_constant={HomePageConstant?.homeBanner}/>
    <AttemptFails/>

    
    
    </>
  )
};

export default HomePageComponent;
