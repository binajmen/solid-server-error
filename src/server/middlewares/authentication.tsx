import type { MiddlewareInput } from "solid-start/entry-server/StartServer";
import type { FetchEvent } from "solid-start/server/types";
// import { session } from "~/server/session";
// import { IUser } from "~/server/database/entities/user";

// declare global {
//   interface Env {
//     currentUser?: IUser;
//   }
// }

export const useAuthentication = ({ forward }: MiddlewareInput) => {
  return async (event: FetchEvent) => {
    console.log("(middleware)");
    // event.env.currentUser = await session.getCurrentUser(event.request);
    return forward(event);
  };
};
