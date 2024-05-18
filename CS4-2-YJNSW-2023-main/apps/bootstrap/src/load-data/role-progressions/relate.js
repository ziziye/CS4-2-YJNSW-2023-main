import progressions from "./role-progressions.json" assert { type: "json" };
import strapi from "../strapi-client.js";

export default async function relate(content) {
  for (let progression of progressions) {
    let goalArr = [];
    for (let i = 0; i < progression?.goals.length; i++) {
      const goal = content["goals"][progression?.goals[i]].strapiId;
      goalArr.push(goal);
    }
    const data = {
      fromRole: content["job-roles"][progression?.fromRole].strapiId,
      toRole: content["job-roles"][progression?.toRole].strapiId,
      goals: goalArr,
    };

    console.log(`- relating ${progression.fromRole} to ${progression.toRole}`);
    await strapi.post("/api/role-progressions", JSON.stringify({ data }));
  }
}
