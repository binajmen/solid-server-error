import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, ServerError } from "solid-start/server";
import { prisma } from "~/server/prisma";

export function routeData() {
  return createServerData$(async () => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: "notfound" },
      });
      return user;
    } catch (error) {
      throw new ServerError("Prisma error");
    }
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
