import roles from "./job-roles-relate.json" assert { type: "json" };
import strapi from "../strapi-client.js";

export default async function relate(content) {
  let data = {};

  for (let role of roles) {
    const capabilitiesArr = [];
    const activitiesArr = [];

    for (let i = 0; i < role?.capabilities.length; i++) {
      const capability = content["capabilities"][role?.capabilities[i]].strapiId;
      capabilitiesArr.push(capability);
    }
    for (let i = 0; i < role?.activities.length; i++) {
      const activity = content["activities"][role?.activities[i]].strapiId;
      activitiesArr.push(activity);
    }
    data = {
      streams: content["streams"][role?.streams].strapiId,
      capabilities: capabilitiesArr,
      activities: activitiesArr,
    };

    const route = "/api/job-roles/" + content["job-roles"][role.id].strapiId;
    console.log(`- relating ${role.id} with ${role.streams} and ${role.capabilities}`);

    await strapi.put(route, JSON.stringify({ data }));
  }
}
