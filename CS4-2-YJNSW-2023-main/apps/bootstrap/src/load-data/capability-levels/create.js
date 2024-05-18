import capabilityLevels from "./capability-levels.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let capabilityLevel of capabilityLevels) {
    console.log(`- creating ${capabilityLevel.capabilityLevelName}`);
    const response = await strapi.post(
      `/api/capability-levels`,
      JSON.stringify({ data: unsetId(capabilityLevel) })
    );

    results[capabilityLevel.id] = { ...capabilityLevel, strapiId: response.data.id };
  }

  return { "capability-levels": results };
}
