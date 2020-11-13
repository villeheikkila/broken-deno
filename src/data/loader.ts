import { baseUrl, categories } from "../constants/config.ts";
import {
  Availability,
  AvailabilityResponse,
  CacheData,
  Item,
} from "../types.ts";
import { combineObjectArrays, fetchAndRetry } from "./utils.ts";

export const loader = async () => {
  const productData = await Promise.all(
    categories.map((category) =>
      fetchAndRetry<Item[]>(`${baseUrl}/products/${category}`)
    )
  );

  const manufacturers = [
    ...new Set(
      ([] as Item[])
        .concat(...productData)
        .map(({ manufacturer }) => manufacturer)
    ),
  ];

  const availabilityData = await Promise.all(
    manufacturers.map((manufacturer) =>
      fetchAndRetry<AvailabilityResponse>(
        `${baseUrl}/availability/${manufacturer}`
      )
    )
  );

  const availabilityResponse = availabilityData.map(({ response }) => response);

  const availability = ([] as Availability[])
    .concat(...availabilityResponse)
    .map(({ id, DATAPAYLOAD }) => ({
      id: id.toLowerCase(),
      stock: DATAPAYLOAD.substring(31).slice(0, -31),
    }));

  const combinedArrays = productData.map((category) =>
    combineObjectArrays(category, availability)
  );

  const finalObject = categories.reduce(
    (result, category, i) => ({ ...result, [category]: combinedArrays[i] }),
    {} as CacheData
  );

  return finalObject;
};
