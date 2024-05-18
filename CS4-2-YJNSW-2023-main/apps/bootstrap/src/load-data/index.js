import { contentTypes } from "./content-types.js";

export async function loadData() {
  const content = await createContent();
  await relateContent(content);
}

async function createContent() {
  console.log("---- creating content");

  let results = {};

  for (let contentType of contentTypes) {
    console.log(`-- creating ${contentType.name}`);
    const result = contentType.create ? await contentType.create() : {};
    results = { ...results, ...result };
  }

  return results;
}

async function relateContent(content) {
  console.log("---- relating content");

  for (let contentType of contentTypes) {
    console.log(`-- relating ${contentType.name}`);
    if (contentType.relate) {
      await contentType.relate(content);
    }
  }
}
