const express = require("express");

const server = express();

server.use(express.json());

let users = [
    {
        id: "1", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
    },
];

server.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    res.status(200).json(users);
});

server.post("/api/users", (req, res) => {
    const user = req.body;
    users.push(user);

    res.status(201).json(users);
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    users = users.filter((h) => h.id !== Number(id));

    res.status(200).json(users);
});

server.put("api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find((h) => h.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "user not found" });
    }
});

const port = 8000;

server.listen(port, () => console.log(`api running on port ${port}`));
