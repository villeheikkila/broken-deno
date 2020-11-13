import { CacheData } from "../types.ts";
import { loader } from "./loader.ts";

self.onmessage = async () => {
  console.log("Fetching and transforming data!");
  try {
    const data = await loader();
    self.postMessage(data);
  } catch (error) {
    console.error(error);
  }
};
