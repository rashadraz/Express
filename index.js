const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send({ message: "HelloWorld!!!!!!" });
});

app.post("/user", (req, res) => {
    res.send({ message: "User Created Succesfully!!!!!!" });
})

app.listen(3000, () => {
	console.log("Server Started");
});
