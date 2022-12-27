import { useI18n } from "@solid-primitives/i18n";
import { useLocation } from "@solidjs/router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "solid-headless";
import type { ParentProps } from "solid-js";
import { Match, Switch, For } from "solid-js";
import { A, useNavigate, useParams } from "solid-start";

const leftNavigation = [
  // { path: "home", icon: <i class="fa-solid fa-house"></i> },
  { path: "contact", icon: <i class="fa-solid fa-comments"></i> },
];

const rightNavigation = [
  { path: "login", icon: <i class="fa-solid fa-key"></i> },
];

export default function UserLayout(props: ParentProps) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [t, { locale }] = useI18n();

  function onLang(
    e: InputEvent & {
      currentTarget: HTMLSelectElement;
      target: Element;
    }
  ) {
    const redirectTo = location.pathname.replace(
      `/${locale()}`,
      `/${e.currentTarget.value}`
    );
    locale(e.currentTarget.value);
    navigate(redirectTo);
  }

  return (
    <div class="min-h-full">
      <Disclosure
        defaultOpen={false}
        as="nav"
        class="border-b border-gray-200 bg-white"
      >
        {({ isOpen }) => (
          <>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex h-16 justify-between">
                <div class="flex">
                  <div class="flex flex-shrink-0 items-center">
                    <A href="/">
                      <img class="h-8 w-auto" src="/qcx_logo.png" alt="QCX" />
                    </A>
                  </div>
                  <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <For each={leftNavigation}>
                      {(item) => (
                        <A
                          href={item.path}
                          class="inline-flex gap-3 items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          activeClass="border-indigo-500 text-gray-900"
                          inactiveClass="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          // aria-current={item.current ? "page" : undefined}
                        >
                          {item.icon}
                          {t(`menu.${item.path}`)}
                        </A>
                      )}
                    </For>
                  </div>
                </div>
                <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <For each={rightNavigation}>
                    {(item) => (
                      <A
                        href={item.path}
                        class="inline-flex gap-3 items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        activeClass="border-indigo-500 text-gray-900"
                        inactiveClass="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        // aria-current={item.current ? "page" : undefined}
                      >
                        {item.icon}
                        {t(`menu.${item.path}`)}
                      </A>
                    )}
                  </For>
                  <div class="self-center">
                    <div class="hidden sm:-my-px sm:flex sm:space-x-2">
                      <select value={params.lang} onInput={onLang}>
                        <For each={["fr", "nl", "en", "ru"]}>
                          {(lang) => (
                            <option value={lang}>{lang.toUpperCase()}</option>
                          )}
                        </For>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="-mr-2 flex items-center sm:hidden">
                  <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="sr-only">Open main menu</span>
                    <Switch>
                      <Match when={isOpen()}>
                        <i class="fa-solid fa-xmark" aria-hidden="true" />
                      </Match>
                      <Match when={!isOpen()}>
                        <i class="fa-solid fa-bars" aria-hidden="true" />
                      </Match>
                    </Switch>
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel class="sm:hidden">
              <div class="space-y-1 pt-2 pb-3">
                <For each={leftNavigation}>
                  {(item) => (
                    <DisclosureButton
                      as={A}
                      href={item.path}
                      class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      activeClass="bg-indigo-50 border-indigo-500 text-indigo-700"
                      inactiveClass="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      // aria-current={item.current ? "page" : undefined}
                    >
                      {t(`menu.${item.path}`)}
                    </DisclosureButton>
                  )}
                </For>
                <For each={rightNavigation}>
                  {(item) => (
                    <DisclosureButton
                      as={A}
                      href={item.path}
                      class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      activeClass="bg-indigo-50 border-indigo-500 text-indigo-700"
                      inactiveClass="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      // aria-current={item.current ? "page" : undefined}
                    >
                      {t(`menu.${item.path}`)}
                    </DisclosureButton>
                  )}
                </For>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <div class="py-10">{props.children}</div>
    </div>
  );
}
