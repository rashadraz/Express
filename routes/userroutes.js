const { UserController } = require("../controllers/UserController");
const { updateUserValidator } = require("../validators/updateUserValidator");

const router = require("express").Router();

router.put("/:id", updateUserValidator, UserController.updateUser);
router.get("/:id",UserController.getUser)
router.delete("/:id",UserController.deleteUser)
module.exports = router;
