import dotenv from "dotenv";
import solid from "solid-start/vite";
import { defineConfig } from "vite";
// @ts-expect-error no typing
import node from "solid-start-node";

export default defineConfig(() => {
  // not sure how well it will work in non-node edge environments
  dotenv.config();
  return {
    plugins: [solid({ adapter: node(), ssr: true })],
    ssr: {
      external: ["@prisma/client"],
    },
  };
});
