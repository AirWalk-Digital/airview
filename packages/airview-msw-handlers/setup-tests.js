import { setupServer } from "msw/node";
import { AirviewMockServer } from "./src";

const { handlers, resetData } = new AirviewMockServer(
  0,
  "http://airview-mock-server"
);

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  resetData();
  server.resetHandlers();
});

afterAll(() => server.close());
