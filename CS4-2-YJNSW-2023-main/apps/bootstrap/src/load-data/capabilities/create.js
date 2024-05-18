import capabilities from "./capabilities-create.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let capability of capabilities) {
    console.log(`- creating ${capability.capabilityName}`);
    const response = await strapi.post(
      `/api/capabilities`,
      JSON.stringify({ data: unsetId(capability) })
    );

    results[capability.id] = { ...capability, strapiId: response.data.id };
  }

  return { capabilities: results };
}
