import axios from "axios";

// Helper to choose API base from env
const getApiBase = () => {
  const server = process.env.NEXT_PUBLIC_API_SERVER;
  if (server === "production") return process.env.NEXT_PUBLIC_PRODUCTION_API_URL;
  if (server === "stage") return process.env.NEXT_PUBLIC_STAGE_API_URL;
  return process.env.NEXT_PUBLIC_LOCALHOST_API_URL;
};

export const useVlsAibeQuery = async (data) => {
  try {
    const apiBase = getApiBase() || "";
    const base = apiBase.replace(/\/$/, "");
    const url = `${base}/vls-aibe/register`;

    // Resolve client key: default to tenant key 'vls_law'
    let clientKey = "vls_law";
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("client_key") || localStorage.getItem("_client_key");
      // prefer stored value only if explicitly present
      if (stored) clientKey = stored;
    }

    const headers = {
      "Content-Type": "application/json",
    };
    if (clientKey) headers["X-Client-Key"] = clientKey;

    // Fallback: include client_key in body when header isn't provided
    const payload = { ...data };
    if (!headers["X-Client-Key"]) {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("client_key") || localStorage.getItem("_client_key");
        payload.client_key = stored || clientKey || "vls_law";
      } else {
        payload.client_key = clientKey || "vls_law";
      }
    }

    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error("useVlsAibeQuery API Error:", error?.response?.data || error.message);
    return { success: false, error: error?.response?.data || error.message };
  }
};