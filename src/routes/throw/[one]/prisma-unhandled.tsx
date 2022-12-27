import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, ServerError } from "solid-start/server";
import { prisma } from "~/server/prisma";

export function routeData() {
  return createServerData$(async () => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: "notfound" },
    });
    return user;
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
