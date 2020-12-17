import { Colors } from "../constants/dependencies.ts";

export async function fetchAndRetry<T>(url: string, retries = 5): Promise<T> {
  const response = await fetch(url);
  const json = await response.json();

  if (json && !(json?.response === "[]")) return json;

  if (retries > 0) {
    console.warn(
      Colors.yellow(
        `⚠️  ${timestamp()}: HTTP request to ${url} failed, trying again in two seconds.`,
      ),
    );
    await sleep(2);
    return await fetchAndRetry(url, retries - 1);
  }

  throw "The API has been down for too long";
}

export const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function combineObjectArrays<
  A extends { id: string },
  B extends { id: string },
>(objectArray1: A[], objectArray2: B[]) {
  return objectArray1.map((anObject1, i) => ({
    index: ++i,
    ...anObject1,
    ...objectArray2.find((anObject2) => anObject1.id === anObject2.id),
  }));
}

export const timestamp = () => {
  const currentTime = new Date();
  return `${currentTime.getHours()}:${
    String(currentTime.getMinutes()).padStart(
      2,
      "0",
    )
  }:${String(currentTime.getSeconds()).padStart(2, "0")}`;
};
