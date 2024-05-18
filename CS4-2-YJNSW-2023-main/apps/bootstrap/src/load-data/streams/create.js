import streams from "./streams.json" assert { type: "json" };
import strapi from "../strapi-client.js";
import { unsetId } from "../utils.js";

export default async function create() {
  const results = {};

  for (let stream of streams) {
    console.log(`- creating ${stream.streamName}`);
    const response = await strapi.post(`/api/streams`, JSON.stringify({ data: unsetId(stream) }));

    results[stream.id] = { ...stream, strapiId: response.data.id };
  }

  return { streams: results };
}
