// @refresh reload
import { useLocation } from "@solidjs/router";
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

function extractLocale(path: string, defaultLocale = "en") {
  const segments = path.split("/");
  let locale = segments[1];

  if (locale && locale.length === 2) {
    return locale;
  } else {
    return defaultLocale;
  }
}

export default function Root() {
  const location = useLocation();
  const locale = extractLocale(location.pathname);

  return (
    <Html lang={locale} class="h-full">
      <Head>
        <Title>QCX Test Platform</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="QCX Test Platform" />
        <script
          src="https://kit.fontawesome.com/9b4fdc5529.js"
          crossorigin="anonymous"
        />
      </Head>
      <Body class="h-full">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
