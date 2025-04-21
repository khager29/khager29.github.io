import Fastify, { FastifyInstance } from "fastify";
import dbConnector from "./connector";
import { routes } from "./route";

const server: FastifyInstance = Fastify({ logger: true });
server.register(dbConnector);
server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 4200, host: "0.0.0.0" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
