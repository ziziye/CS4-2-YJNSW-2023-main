import goals from "./goals-relate.json" assert { type: "json" };
import strapi from "../strapi-client.js";

export default async function relate(content) {
  for (let goal of goals) {
    const data = {
      goalType: content["goal-types"][goal?.goalType].strapiId,
      goalSubtype: content["goal-subtypes"][goal?.goalSubtype].strapiId,
    };
    const route = "/api/goals/" + content["goals"][goal.id].strapiId;
    console.log(`- relating ${goal.id} with ${goal.goalType} and ${goal.goalSubtype}`);

    await strapi.put(route, JSON.stringify({ data }));
  }
}
