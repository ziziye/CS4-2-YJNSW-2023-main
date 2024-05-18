import activityTypes from "./activity-types.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let activityType of activityTypes) {
    console.log(`- creating ${activityType.activityTypeName}`);
    const response = await strapi.post(
      `/api/activity-types`,
      JSON.stringify({ data: unsetId(activityType) })
    );

    results[activityType.id] = { ...activityType, strapiId: response.data.id };
  }

  return { "activity-types": results };
}
