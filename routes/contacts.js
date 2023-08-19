const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContacts,
  deleteContacts,
} = require("../controllers/contacts");

router.route("/").get(getContacts).post(createContact);
router.route("/:id").patch(updateContacts).delete(deleteContacts);

module.exports = router;
