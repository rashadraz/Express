const { connect } = require("../dbconfig");
const { User } = require("../models/User");
const { userResponseParser } = require("../parser/userResponseParser");

exports.UserController = {
	async getuserByEmail(email) {
		const user = await User.findOne({ where: { email: email } });
		return user;
	},

	async updateUser(req, res) {
		await connect();

		const body = req.body;

		for (let k in body) {
			if (k == "password") {
				delete body[k];
			} else if (body[k] == null && body[k] === undefined) delete body[k];
		}
		let user = await User.update(body, { where: { id: req.params.id } });

		console.log("users", user);
		res.send({ message: "User Updated Successfully" });
	},

	async getUser(req, res) {
		await connect();
		let user = await User.findByPk(req.params.id);

		if (!user) res.status(404).json({ errors: { msg: "user not found" } });
		else res.send(userResponseParser(user));
	},

	async deleteUser(req, res) {
		try {
			await connect();
			const user = await User.findByPk(req.params.id);

			if (!user) {
				res.status(404).json({ errors: { msg: "User not found" } });
			} else {
				await user.destroy();
				res.send({ message: "User deleted successfully" });
			}
		} catch (error) {
			res.status(500).json({ errors: { msg: "Internal server error" } });
		}
	},
};
