const express = require("express");

// const { init } = require("./dbconfig")
const app = express();
// init()
app.use(express.json());

const { registerValidator } = require("./validators/registerValidator");
const { HomeController } = require("./controllers/HomeController");

app.get("/", (req, res) => {
	res.send({ message: "HelloWorld!!!!!!" });
});

app.post("/register", registerValidator, HomeController.register);

app.post("/user", (req, res) => {
	const body = req.body;
	res.send(body);
});

app.get("/user", (req, res) => {
	const { id } = req.query;
	res.send({ id: id });
});

app.get("/user/:id/username/:name", (req, res) => {
	const { id, name } = req.params;
	res.send({ id, name });
});

app.listen(3000, () => {
	console.log("Server Started");
});
