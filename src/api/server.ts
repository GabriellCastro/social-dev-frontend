import axios from "axios";

export const api = axios.create({
  baseURL: "https://social-dev-api.up.railway.app",
});
