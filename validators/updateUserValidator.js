const { body, validationResult, param } = require("express-validator");

exports.updateUserValidator = [
	param("id").not().isEmpty().isInt(),
	body("firstname").isString().isLength({ min: 3 }).optional(),
	body("lastname").isString().isLength({ min: 3 }).optional(),
	body("email").isEmail().withMessage("Email Format is incorrect").optional(),
	body("password").isString().isLength({ min: 3 }).optional(),
	body("contact").isString().isLength({ max: 11 }).optional(),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
