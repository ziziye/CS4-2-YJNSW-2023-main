import goalSubtypes from "./goal-subtypes.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let goalSubtype of goalSubtypes) {
    console.log(`- creating ${goalSubtype.goalSubtypeName}`);
    const response = await strapi.post(
      `/api/goal-subtypes`,
      JSON.stringify({ data: unsetId(goalSubtype) })
    );

    results[goalSubtype.id] = { ...goalSubtype, strapiId: response.data.id };
  }

  return { "goal-subtypes": results };
}
