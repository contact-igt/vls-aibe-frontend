import axios from "axios";

// const VLSAIBE = "/vls-law-aibe";

// const APISERVER =
//   process.env.NEXT_PUBLIC_API_SERVER === "production"
//     ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
//     : process.env.NEXT_PUBLIC_STAGE_API_URL === "stage"
//       ? process.env.NEXT_PUBLIC_STAGE_API_URL
//       : process.env.NEXT_PUBLIC_LOCALHOST_API_URL;

export const useVlsAibeQuery = async (data) => {
  try {
    const response = await axios.post(
      `https://stageapi.invictusglobaltech.com/api/v1/vls-law-aibe`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(
      "useVlsAibeQuery API Error:",
      error?.response?.data || error.message,
    );
    return { success: false, error: error?.response?.data || error.message };
  }
};
