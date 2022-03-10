import { setupWorker } from "msw";
import { handlers } from "./server";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
