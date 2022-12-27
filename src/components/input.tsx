import clsx from "clsx";
import type { JSX} from "solid-js";
import { Match, Show, splitProps, Switch } from "solid-js";

export default function Input(
  props: JSX.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    description?: string;
    error?: string;
  }
) {
  const [, inputProps] = splitProps(props, ["label", "description", "error"]);

  return (
    <div>
      <label for={props.name} class="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div class="mt-1">
        <input
          {...inputProps}
          name={props.name}
          id={props.name}
          class={clsx(
            "block w-full rounded-md sm:text-sm",
            !props.error &&
              "border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
            !!props.error &&
              "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
          )}
        />
      </div>
      <Switch>
        <Match when={props.error}>
          <p class="mt-2 text-sm text-red-500">{props.error}</p>
        </Match>
        <Match when={props.description}>
          <p class="mt-2 text-sm text-gray-500">{props.description}</p>
        </Match>
      </Switch>
    </div>
  );
}
