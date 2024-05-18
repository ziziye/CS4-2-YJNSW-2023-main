import roles from "./job-roles-create.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let role of roles) {
    console.log(`- creating ${role.roleName}`);
    const response = await strapi.post(`/api/job-roles`, JSON.stringify({ data: unsetId(role) }));

    results[role.id] = { ...role, strapiId: response.data.id };
  }

  return { "job-roles": results };
}
