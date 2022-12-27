import { ServerError } from "solid-start";

export function unauthorized() {
  throw new ServerError("Unauthorized", { status: 401 });
}

export function notFound() {
  throw new ServerError("Not Found", { status: 404 });
}
