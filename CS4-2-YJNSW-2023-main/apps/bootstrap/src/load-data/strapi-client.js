import fetch from "node-fetch";
import dotenv from "dotenv";
import { checkStatus } from "./utils.js";

dotenv.config();

const BASE_URL = process.env.STRAPI_BASE_URL;
const BEARER_TOKEN = `bearer ${process.env.STRAPI_BEARER_TOKEN}`;
const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: BEARER_TOKEN,
};

async function post(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: defaultHeaders,
    body,
  });

  await checkStatus(response);

  return await response.json();
}

async function put(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: defaultHeaders,
    body,
  });

  await checkStatus(response);

  return await response.json();
}

export default {
  post,
  put,
};
