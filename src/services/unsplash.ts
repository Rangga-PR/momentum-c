import axios from "axios";

const endpoint = "https://source.unsplash.com";
const headers = {
  "Content-Type": "application/json",
};

export const getRandomImg = (size: string) => {
  return axios({ url: `${endpoint}/random/${size}`, headers });
};
