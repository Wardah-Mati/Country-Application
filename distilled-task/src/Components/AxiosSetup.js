import axios from "axios";
import { setupCache } from "axios-cache-adapter";


// set up cache to save results of API
export const cache = setupCache({
    maxAge: 15 * 60 * 1000
});

export const axiosInstance = axios.create({
  adapter: cache.adapter
});
