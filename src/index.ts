import { Elysia } from "elysia";
import { routes } from "./routes";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({ status: "ok" }))
  .use(routes)
  .listen(port);

console.log(`🦊 Server Elysia berjalan di http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
