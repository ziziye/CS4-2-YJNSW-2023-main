import activities from "./activities-relate.json" assert { type: "json" };
import strapi from "../strapi-client.js";

export default async function relate(content) {
  for (let activity of activities) {
    const data = {
      activityType: content["activity-types"][activity?.activityType].strapiId,
      capability: content["capabilities"][activity?.capability].strapiId,
    };
    const route = "/api/activities/" + content["activities"][activity.id].strapiId;
    console.log(
      `- relating ${activity.id} with ${activity.capability} and ${activity.activityType}`
    );

    await strapi.put(route, JSON.stringify({ data }));
  }
}
