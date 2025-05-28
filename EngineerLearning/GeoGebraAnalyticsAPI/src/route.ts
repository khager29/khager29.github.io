import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ObjectId } from "@fastify/mongodb";

interface Params {
    logDataId: string;
}

interface Body {
    materialID: string;
    usedKeyboardInstructions: boolean;
    usedArrows: boolean;
    openedInstructions: boolean;
    pressedButtons: number;
    timeStart: number;
    timeInApplet: number;
    mouseUsed: boolean;
}

export const routes = async (fastify: FastifyInstance) => {
    const db = fastify.mongo.client.db(process.env.DB_NAME);
    const collection = db.collection("logData");
    if (!collection) {
        throw new Error("no collection");
        return;
    }

    fastify.get("/", async (req, res) => {
        return { hello: "world" };
    });

    fastify.get("/logData", async (req, res) => {
        const result = await collection.find().toArray();
        if (result.length === 0) {
            throw new Error("No documents found");
        }
        return result;
    });

    const getID = (
        req: FastifyRequest<{ Params: Params; Body: Body }>,
        res: FastifyReply
    ) => {
        const { logDataId } = req.params;
        if (!ObjectId.isValid(logDataId)) {
            return res.status(400).send({ error: "Invalid ObjectId format" });
        }
        const objectId = new ObjectId(logDataId);
        return objectId;
    };

    fastify.get(
        "/logData/:logDataId",
        async (
            req: FastifyRequest<{ Params: Params; Body: Body }>,
            res: FastifyReply
        ) => {
            const objectId = getID(req, res);
            const result = await collection.findOne({ _id: objectId });

            if (!result) {
                return res.status(404).send({
                    error: `No document found with ID ${req.params.logDataId}`,
                });
            }

            return result;
        }
    );

    const schema = {
        schema: {
            body: {
                type: "object",
                required: ["materialID"],
                properties: {
                    materialID: {
                        type: "string",
                    },
                    usedKeyboardInstructions: {
                        type: "boolean",
                    },
                    usedArrows: {
                        type: "boolean",
                    },
                    openedInstructions: {
                        type: "boolean",
                    },
                    pressedButtons: {
                        type: "string",
                    },
                    timeStart: {
                        type: "string",
                    },
                    timeStartUTC: {
                        type: "string",
                    },
                    timeInApplet: {
                        type: "number",
                    },
                    mouseUsed: {
                        type: "boolean",
                    },
                },
            },
        },
    };

    fastify.post(
        "/logData",
        schema,
        async (req: FastifyRequest<{ Params: Params; Body: Body }>, reply) => {
            const db = fastify.mongo.client.db(process.env.DB_NAME);
            const collection = db.collection("logData");
            if (!collection) {
                console.error("Collection not available");
                return reply
                    .code(500)
                    .send({ error: "Database not connected" });
            }

            try {
                const result = await collection.insertOne(req.body);
                console.log("Data inserted:", result.insertedId);
                return reply.send({ insertedId: result.insertedId });
            } catch (err) {
                console.error("Error inserting:", err);
                return reply.code(500).send({ error: "Insert failed" });
            }
        }
    );

    fastify.put(
        "/logData/:logDataId",
        schema,
        async (
            req: FastifyRequest<{ Params: Params; Body: Body }>,
            res: FastifyReply
        ) => {
            const objectId = getID(req, res);
            const result = await collection.findOneAndUpdate(
                { _id: objectId },
                { $set: req.body }
            );
            return result;
        }
    );

    fastify.delete(
        "/logData/:logDataId",
        schema,
        async (
            req: FastifyRequest<{ Params: Params; Body: Body }>,
            res: FastifyReply
        ) => {
            const objectId = getID(req, res);
            const result = await collection.findOneAndDelete({ _id: objectId });
            return result;
        }
    );

    fastify.delete(
        "/logData",
        schema,
        async (
            req: FastifyRequest<{ Params: Params; Body: Body }>,
            res: FastifyReply
        ) => {
            const result = await collection.deleteMany({});
            return result;
        }
    );
};
