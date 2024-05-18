import goalTypes from "./goal-types.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let goalType of goalTypes) {
    console.log(`- creating ${goalType.goalTypeName}`);
    const response = await strapi.post(
      `/api/goal-types`,
      JSON.stringify({ data: unsetId(goalType) })
    );

    results[goalType.id] = { ...goalType, strapiId: response.data.id };
  }

  return { "goal-types": results };
}
