const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "html", "create-card.html"));
});

app.get("/create-card", (req, res) => {
    res.sendFile(path.resolve(__dirname, "html", "create-card.html"));
});

app.get("/cards", (req, res) => {
    res.sendFile(path.resolve(__dirname, "html", "cards.html"))
});

app.listen(3000, () => {
    console.log("Server is running");
});
