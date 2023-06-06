const { Sequelize } = require("sequelize");

const sequelise = new Sequelize("Express", "root", "", {
	dialect: "mysql",
	host: "localhost",
});

function init() {
	sequelise
		.sync({
			alter: true,
		})
		.then((res) => {
			console.log("Database connection succesfull");
		})
		.catch((err) => console.log("Database connection error: " + err));
}
async function connect() {
	try {
		await sequelise.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

function close() {
	sequelise.close();
}

exports.connect = connect;
exports.close = close;
exports.init = init;

exports.sequelise = sequelise;

const { User } = require("./models/User");
const { Team } = require("./models/Team");
const { Project } = require("./models/Project");
Team.hasMany(Project, {
	foreignKey: {
		allowNull: true,
	},
});
Team.hasMany(User, {
	foreignKey: {
		name: "team_id",
		allowNull: true,
	},
});
