export function unsetId(input) {
  const copy = { ...input };
  copy.id = undefined;

  return copy;
}

class HttpResponseError extends Error {
  constructor(response, ...args) {
    super(`${response.status} ${response.statusText}`, ...args);
    this.response = response;
  }
}

export async function checkStatus(response) {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    console.error("==== error response body");
    console.error(JSON.stringify(await response.json()));
    console.error("====");

    throw new HttpResponseError(response);
  }
}
