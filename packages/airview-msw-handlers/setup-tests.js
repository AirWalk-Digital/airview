import { setupServer } from "msw/node";
import { createHandlers } from "./src";

const { handlers, resetData } = createHandlers(0, "http://airview-mock-server");

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  resetData();
  server.resetHandlers();
});

afterAll(() => server.close());
