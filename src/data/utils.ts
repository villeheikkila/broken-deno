export async function fetchAndRetry<T>(url: string, retries = 5): Promise<T> {
  const response = await fetch(url);
  const json = await response.json();

  if (json && !(JSON.stringify(json.response) === `"[]"`)) return json;

  if (retries > 0) {
    console.log(`HTTP request to ${url} failed, trying again in two seconds.`);
    await sleep(2);
    return await fetchAndRetry(url, --retries);
  }

  throw "The API has been down for too long";
}

export const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function combineObjectArrays<
  A extends { id: string },
  B extends { id: string }
>(objectArray1: A[], objectArray2: B[]) {
  return objectArray1.map((anObject1: A, i) => ({
    index: ++i,
    ...anObject1,
    ...objectArray2.find((anObject2: B) => anObject1.id === anObject2.id),
  }));
}
