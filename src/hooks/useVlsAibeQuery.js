import axios from "axios";

const VLSAIBE = "/vls-law-aibe";

const APISERVER =
  process.env.NEXT_PUBLIC_API_SERVER === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
    : process.env.NEXT_PUBLIC_API_SERVER === "stage"
    ? process.env.NEXT_PUBLIC_STAGE_API_URL
    : process.env.NEXT_PUBLIC_LOCALHOST_API_URL;

export const useVlsAibeQuery = async (data) => {
  const response = await axios.post(`${APISERVER}${VLSAIBE}`, data);
  return response.data;
};
