import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";

const server: FastifyInstance = Fastify({});

const putOpts: RouteShorthandOptions = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            },
        },
        params: {
            type: "object",
            required: ["id"],
            properties: {
                id: { type: "string" },
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    pong: {
                        type: "string",
                    },
                    home: {
                        type: "string",
                    },
                },
            },
            404: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                    },
                },
            },
        },
    },
};
const getOpts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    pong: {
                        type: "string",
                    },
                    home: {
                        type: "string",
                    },
                    updated: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            title: { type: "string" },
                            year: { type: "string" },
                        },
                    },
                },
            },
            404: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                    },
                },
            },
        },
    },
};
interface UpdateRequestParams {
    id: string;
}

interface UpdateRequestBody {
    name: string;
}

server.get<{ Params: UpdateRequestParams }>(
    "/update?=id",
    getOpts,
    async (req, res) => {
        const { id } = req.params;
        return {
            updated: {
                id,
                name: "Example Name",
                title: "Stackoverflow Compilation Book 1",
                year: 2019,
            },
        };
    }
);

server.get("/", getOpts, async (req, res) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
        return { home: "not found" };
    } else if (res.statusCode > 500) {
        return { home: "server error" };
    } else if (res.statusCode === 200) {
        return { home: "found it!" };
    }
    throw new Error("it broke");
});
server.get("/ping", getOpts, async (req, res) => {
    console.log("Request received:", req);
    return { pong: "it worked!" };
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: "0.0.0.0" });
        const address = server.server.address();
        const port = typeof address === "string" ? address : address?.port;
        console.log(`Server listening on ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
