const express = require("express");

const router = express.Router();
// const { validation } = require("../../middlewares");
// const schemas = require("../../schemas/contact");
// ! виправити схему згідно нашого юзера
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const db = require("../../controllers/users");

router.get("/", ctrlWrapper(db.getUsers));
router.get("/:id", ctrlWrapper(db.getUserById));
router.post("/", ctrlWrapper(db.createUser));
// router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addUser));
router.put(
  "/:id",
  // validation(schemas.addSchema),
  ctrlWrapper(db.updateUser)
);
router.delete("/:id", ctrlWrapper(db.deleteUser));



module.exports = router;
