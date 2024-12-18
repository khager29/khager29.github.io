import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

// using the public folder at the root of the project
app.use(express.static("public"));

// using the images folder at the route images
app.use("/images", express.static("images"));

// using express.json and express.urlencoded
app.use(express.urlencoded({ extended: true }));

// GET
app.get("/", (req, res) => {
    res.json(data);
});

// POST - express.json and express.urlencoded
app.post("/item", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// GET with routing params
app.get("/class/:id", (req, res) => {
    const studentID = Number(req.params.id);
    const student = data.filter((student) => student.id === studentID);
    res.send(student);
});

// GET with next()
app.get(
    "/next",
    (req, res, next) => {
        console.log("The response will be sent by the next function");
        next();
    },
    (req, res) => {
        res.send("I just set up a route with a second callback.");
    }
);

// GET - download method
app.get("/download", (req, res) => {
    res.download("images/mountains_2.jpeg");
});

// Route Chaining
app.route("/class")
    .get((req, res) => {
        // res.send("Retrieve class info");
        throw new Error();
    })
    .post((req, res) => {
        res.send("Create class info");
    })
    .put((req, res) => {
        res.send("Update class info");
    });

// // GET
// app.get("/redirect", (req, res) => {
//     res.redirect("http://www.linkedin.com");
// });

// // POST
// app.post("/create", (req, res) => {
//     res.send("This is a POST request at /create.");
// });

// // PUT
// app.put("/update", (req, res) => {
//     res.send("This is a PUT request at /update.");
// });

// // DELETE
// app.delete("/delete", (req, res) => {
//     res.send("This is a DELETE request at /delete.");
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something is broken.");
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
    // console.log(data);
});
