import goals from "./goals-create.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let goal of goals) {
    console.log(`- creating ${goal.goalName}`);
    const response = await strapi.post(`/api/goals`, JSON.stringify({ data: unsetId(goal) }));

    results[goal.id] = { ...goal, strapiId: response.data.id };
  }

  return { goals: results };
}
