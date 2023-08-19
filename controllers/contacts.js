const { StatusCodes } = require("http-status-codes");
const contacts = require("../models/contacts");

const createContact = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const contact = await contacts.create(req.body);
    res.status(StatusCodes.CREATED).json({ contact });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getContacts = async (req, res) => {
  try {
    const contact = await contacts.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ contact });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const updateContacts = async (req, res) => {
  try {
    const { id: contactID } = req.params;
    const filter = { _id: contactID };
    const update = req.body;
    const updateContact = await contacts.findByIdAndUpdate(filter, update, {
      new: true,
    });
    if (!updateContact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No task with id: ${contactID}` });
    }
    res.status(StatusCodes.OK).json({ updateContact });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const deleteContacts = async (req, res) => {
  try {
    const { id: contactID } = req.params;
    const filterDelete = { _id: contactID };
    const deleteContact = await contacts.findByIdAndDelete(filterDelete);
    if (!deleteContact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No task with id: ${contactID}` });
    }
    res.status(StatusCodes.OK).json({ msg: "delete OK" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

module.exports = { createContact, getContacts, updateContacts, deleteContacts };
