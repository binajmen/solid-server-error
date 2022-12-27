import type { ParentProps } from "solid-js";

export default function Header(props: ParentProps) {
  return (
    <header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {props.children}
        </h1>
      </div>
    </header>
  );
}
