const express = require("express");

const router = express.Router();
const { validation } = require("../../middlewares");
const schemas = require("../../schemas/contact");
// ! виправити схему згідно нашого юзера
const { ctrlWrapper } = require("../../helpers");
const db = require("../../queries");

const { users: ctrl } = require("../../controllers");

// router.get("/", ctrlWrapper(ctrl.getAllUsers));
router.get("/", ctrlWrapper(db.getUsers));

// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addUser));

router.delete("/:id", ctrlWrapper(ctrl.deleteUser));

router.put("/:id", validation(schemas.addSchema), ctrlWrapper(ctrl.updateUser));

module.exports = router;

// module.exports = (pool) => {
//   // Route handlers here, using the 'pool' object for database interaction
//   router.get("/", ctrlWrapper(ctrl.getAllUsers(pool)));
//   router.get("/:id", ctrlWrapper(ctrl.getById(pool)));

//   router.post(
//     "/",
//     validation(schemas.addSchema),
//     ctrlWrapper(ctrl.addUser(pool))
//   );

//   router.delete("/:id", ctrlWrapper(ctrl.deleteUser(pool)));

//   router.put(
//     "/:id",
//     validation(schemas.addSchema),
//     ctrlWrapper(ctrl.updateUser(pool))
//   );

//   return router;
// };

// module.exports = (db) => {
//   router.get("/", ctrlWrapper(ctrl.getAllUsers));
//   router.get("/:id", ctrlWrapper(ctrl.getById));

//   router.post(
//     "/",
//     validation(schemas.addSchema),
//     ctrlWrapper(ctrl.addUser));

//   router.delete("/:id", ctrlWrapper(ctrl.deleteUser));

//   router.put(
//     "/:id",
//     validation(schemas.addSchema),
//     ctrlWrapper(ctrl.updateUser(db))
//   );

//   return router;
// };
