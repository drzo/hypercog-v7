import { fromHono } from "chanfana";
import { Hono } from "hono";
import { GetCurrentState } from "./endpoints/state/getCurrentState";
import { CreateImprovement } from "./endpoints/improvements/createImprovement";
import { CreateNote } from "./endpoints/notes/createNote";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
  openapi: {
    info: {
      title: "HyperCog API",
      version: "1.0.0",
      description: "API for HyperCog self-improvement system"
    }
  }
});

// Register OpenAPI endpoints
openapi.get("/api/state/current", GetCurrentState);
openapi.post("/api/improvements", CreateImprovement);
openapi.post("/api/notes", CreateNote);

// Export the Hono app
export default app;