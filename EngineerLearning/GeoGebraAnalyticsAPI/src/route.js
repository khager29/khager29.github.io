import { ObjectId } from "@fastify/mongodb";
export const routes = async (fastify) => {
    const collection = fastify.mongo.db?.collection("test_collection");
    if (!collection) {
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
    const getID = (req, res) => {
        const { logDataId } = req.params;
        if (!ObjectId.isValid(logDataId)) {
            return res.status(400).send({ error: "Invalid ObjectId format" });
        }
        const objectId = new ObjectId(logDataId);
        return objectId;
    };
    fastify.get("/logData/:logDataId", async (req, res) => {
        const objectId = getID(req, res);
        const result = await collection.findOne({ _id: objectId });
        if (!result) {
            return res.status(404).send({
                error: `No document found with ID ${req.params.logDataId}`,
            });
        }
        return result;
    });
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
    fastify.post("/logData", schema, async (req, res) => {
        const result = await collection.insertOne(req.body);
        return result;
    });
    fastify.put("/logData/:logDataId", schema, async (req, res) => {
        const objectId = getID(req, res);
        const result = await collection.findOneAndUpdate({ _id: objectId }, { $set: req.body });
        return result;
    });
    fastify.delete("/logData/:logDataId", schema, async (req, res) => {
        const objectId = getID(req, res);
        const result = await collection.findOneAndDelete({ _id: objectId });
        return result;
    });
    fastify.delete("/logData", schema, async (req, res) => {
        const result = await collection.deleteMany({});
        return result;
    });
};
