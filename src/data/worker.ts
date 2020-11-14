import { Colors } from "../constants/dependencies.ts";
import { loader } from "./loader.ts";
import { timestamp } from "./utils.ts";

self.onmessage = async () => {
  console.info(Colors.green(`🦕 ${timestamp()}: Refresh started! `));
  try {
    const data = await loader();
    self.postMessage(data);
  } catch (error) {
    console.error(`🔥🔥🔥 ${error.name} : ${error.message} 🔥🔥🔥`);
  }
};
