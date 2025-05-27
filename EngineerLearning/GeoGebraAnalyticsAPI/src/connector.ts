import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log("Loaded MONGO_URI from .env:", process.env.MONGO_URI);

async function dbConnector(fastify: FastifyInstance) {
    fastify.register(fastifyMongo, {
        forceClose: true,
        url: process.env.MONGO_URI,
    });

    fastify.addHook("onReady", async () => {
        console.log("🔗 MongoDB connection registered");
    });
}

export default fastifyPlugin(dbConnector);
