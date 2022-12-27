import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";

export default createHandler(
  // useAuthentication,
  renderAsync((event) => <StartServer event={event} />)
);
