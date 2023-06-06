const express = require("express");

// const { init } = require("./dbconfig")
const app = express();
// init()


const { registerValidator } = require("./validators/registerValidator");
const { HomeController } = require("./controllers/HomeController");
const { loginValidator } = require("./validators/loginValidator");
const userRouter = require("./routes/userroutes");

//router
app.use(express.json());
app.use("/user",userRouter)

app.get("/", (req, res) => {
	res.send({ message: "HelloWorld!!!!!!" });
});

app.post("/register", registerValidator, HomeController.register);
app.post("/login", loginValidator, HomeController.login);

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
