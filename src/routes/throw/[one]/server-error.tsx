import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, ServerError } from "solid-start/server";

export function routeData() {
  return createServerData$(async () => {
    throw new ServerError("Fail", { status: 401 });
  });
}
export default function Index() {
  const data = useRouteData<typeof routeData>();

  return (
    <Show when={data()}>
      <div class="h-full flex flex-col justify-center items-center">
        ThrowOneError
      </div>
    </Show>
  );
}
