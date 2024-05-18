import capabilityTypes from "./capability-types.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let capabilityType of capabilityTypes) {
    console.log(`- creating ${capabilityType.capabilityTypeName}`);
    const response = await strapi.post(
      `/api/capability-types`,
      JSON.stringify({ data: unsetId(capabilityType) })
    );

    results[capabilityType.id] = { ...capabilityType, strapiId: response.data.id };
  }

  return { "capability-types": results };
}
