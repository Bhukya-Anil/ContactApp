
const Contact = require("../models/contactModel");


const addContact = async (req, res) => {
  try {
    const { email } = req.body;


    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res
        .status(400)
        .json({ message: "Contact with this email already exists." });
    }

    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};
