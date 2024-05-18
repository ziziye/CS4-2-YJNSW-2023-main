import capabilities from "./capabilities-relate.json" assert { type: "json" };
import strapi from "../strapi-client.js";

export default async function relate(content) {
  for (let capability of capabilities) {
    const data = {
      capabilityLevel: content["capability-levels"][capability?.capabilityLevel].strapiId,
      capabilityType: content["capability-types"][capability?.capabilityType].strapiId,
    };
    const route = "/api/capabilities/" + content["capabilities"][capability.id].strapiId;
    console.log(
      `- relating ${capability.id} with ${capability.capabilityLevel} and ${capability.capabilityType}`
    );

    await strapi.put(route, JSON.stringify({ data }));
  }
}
