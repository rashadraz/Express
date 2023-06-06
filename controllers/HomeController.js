const { connect, close } = require("../dbconfig");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

exports.HomeController = {
	async register(req, res) {
		await connect();
		let user = await User.findOne({ where: { email: req.body.email } });
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
		res.send(user);
	},
};
