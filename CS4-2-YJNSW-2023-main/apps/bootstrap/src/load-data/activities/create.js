import activities from "./activities-create.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let activity of activities) {
    console.log(`- creating ${activity.activityID}`);
    const response = await strapi.post(
      `/api/activities`,
      JSON.stringify({ data: unsetId(activity) })
    );

    results[activity.id] = { ...activity, strapiId: response.data.id };
  }

  return { activities: results };
}
