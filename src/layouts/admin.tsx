import { Disclosure, DisclosureButton, DisclosurePanel } from "solid-headless";
import type { ParentProps} from "solid-js";
import { Match, Switch, For } from "solid-js";
import { A } from "solid-start";

const leftNavigation = [
  { label: "Organisations", path: "organisations" },
  { label: "Users", path: "users" },
  { label: "Questions", path: "questions" },
  { label: "Questionnaires", path: "questionnaires" },
  { label: "Tests", path: "tests" },
];

const rightNavigation = [{ label: "Account", path: "account" }];

export default function AdminLayout(props: ParentProps) {
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
                    <img class="h-8 w-auto" src="/qcx_logo.png" alt="QCX" />
                  </div>
                  <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <For each={leftNavigation}>{(item) => (
                      <A
                        href={item.path}
                        class="inline-flex gap-3 items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        activeClass="border-red-500 text-gray-900"
                        inactiveClass="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        // aria-current={item.current ? "page" : undefined}
                      >
                        {item.label}
                      </A>
                    )}</For>
                  </div>
                </div>
                <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <For each={rightNavigation}>{(item) => (
                    <A
                      href={`/en/${item.path}`}
                      class="inline-flex gap-3 items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      activeClass="border-red-500 text-gray-900"
                      inactiveClass="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      // aria-current={item.current ? "page" : undefined}
                    >
                      {item.label}
                    </A>
                  )}</For>
                </div>
                <div class="-mr-2 flex items-center sm:hidden">
                  <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
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
                <For each={leftNavigation}>{(item) => (
                  <DisclosureButton
                    as={A}
                    href={item.path}
                    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    activeClass="bg-red-50 border-red-500 text-red-700"
                    inactiveClass="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                    // aria-current={item.current ? "page" : undefined}
                  >
                    {item.label}
                  </DisclosureButton>
                )}</For>
                <For each={rightNavigation}>{(item) => (
                  <DisclosureButton
                    as={A}
                    href={`/en/${item.path}`}
                    class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    activeClass="bg-red-50 border-red-500 text-red-700"
                    inactiveClass="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                    // aria-current={item.current ? "page" : undefined}
                  >
                    {item.label}
                  </DisclosureButton>
                )}</For>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <div class="py-10">{props.children}</div>
    </div>
  );
}
