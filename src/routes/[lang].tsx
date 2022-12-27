import { Outlet, useParams } from "@solidjs/router";
import { I18nProvider } from "~/i18n";
import { dict } from "~/i18n-dict";

export default function Root() {
  const params = useParams();

  return (
    <I18nProvider dict={dict} locale={params.lang}>
      <Outlet />
    </I18nProvider>
  );
}
