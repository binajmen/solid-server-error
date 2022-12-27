import { useI18n } from "@solid-primitives/i18n";
import { ErrorBoundary, Show } from "solid-js";
import { A, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Header from "~/components/header";
import Oops from "~/components/oops";
import { prisma } from "~/server/prisma";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (id, { request }) => {
      const test = await prisma.test.findUniqueOrThrow({
        where: { id },
        include: {
          questionnaire: {
            include: { _count: { select: { questions: true } } },
          },
          _count: { select: { answers: true } },
        },
      });

      return test;
    },
    { key: () => params.testId }
  );
}

export default function TestInstructions() {
  const test = useRouteData<typeof routeData>();
  const [t] = useI18n();

  function getMinutes(count: number) {
    return String(Math.max(Math.round(count / 3 / 5) * 5, 5));
  }

  return (
    <ErrorBoundary fallback={<Oops />}>
      <Show when={test()}>
        <div class="flex flex-col h-full justify-center items-center max-w-lg mx-auto gap-10">
          <Header>{t("instructions.title")}</Header>
          <ul class="list-decimal space-y-2">
            <li>{t("instructions.why")}</li>
            <li>
              {t("instructions.time", {
                amount: getMinutes(test()!.questionnaire._count.questions),
              })}
            </li>
            <li>{t("instructions.resume")}</li>
            <li>{t("instructions.accuracy")}</li>
            <li>{t("instructions.secure")}</li>
          </ul>
          <A href="question" class="button">
            {test()!._count.answers ? t("continue") : t("start")}
          </A>
        </div>
      </Show>
    </ErrorBoundary>
  );
}
