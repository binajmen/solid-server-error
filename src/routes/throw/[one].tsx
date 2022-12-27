import { Outlet } from "solid-start";

export default function Main() {
  return (
    <div class="min-h-full flex flex-col justify-center items-center">
      <p>ONE</p>
      <Outlet />
    </div>
  );
}
