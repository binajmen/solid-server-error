import clsx from "clsx";
import type { ParentProps } from "solid-js";

export default function Container(props: ParentProps & { class?: string }) {
  return (
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class={clsx("px-4 py-8 sm:px-0", props.class)}>
          {props.children}
        </div>
      </div>
    </main>
  );
}
