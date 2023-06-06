const { connect, close } = require("../dbconfig");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { UserController } = require("./UserController");
const { userResponseParser } = require("../parser/userResponseParser");

exports.HomeController = {
	async register(req, res) {
		await connect();
		let user = await UserController.getuserByEmail(req.body.email);
		if (user) {
			return res
				.status(400)
				.json({ errors: { message: "User account already exists" } });
		}
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		user = await User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: hashedPassword,
			contact: req.body.contact,
		});
		// close();
		res.send(userResponseParser(user));
	},
	async login(req, res) {
		await connect();
		let user = await UserController.getuserByEmail(req.body.email);
		if (!user) {
			return res
				.status(404)
				.json({ errors: { message: "No account associated with that Email" } });
		}
		const hashedPassword = bcrypt.compareSync(req.body.password, user.password);

		if (hashedPassword) {
			res.send(userResponseParser(user));
		} else
			return res
				.status(400)
				.json({ errors: { message: "Incorrect Password" } });
	},
};
