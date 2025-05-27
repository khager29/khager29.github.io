import Fastify from "fastify";
import dbConnector from "./connector.js";
import { routes } from "./route.js";
import fastifyCors from "@fastify/cors";
const server = Fastify({ logger: true });
server.register(dbConnector);
server.register(routes);
// I know this isn't a good idea, just for testing
await server.register(fastifyCors, { origin: "*" });
const start = async () => {
    try {
        await server.listen({ port: 4200, host: "0.0.0.0" });
        const address = server.server.address();
        const port = typeof address === "string" ? address : address?.port;
        console.log(`Server listening on ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
