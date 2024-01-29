const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { constants } = require('../constants');

// @desc Get All contacts
// @route GET /api/contacts
// @access  private
// @status done
const getAllContacts = asyncHandler(
    async (req, res) => {
        const contacts = await Contact.find({ user_id: req.user.id });
        res.status(200).json(contacts);
    }
)

// @desc Get contact with given id
// @route GET /api/contacts/:id
// @access  private
// @status done
const getContactWithId = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(constants.NOT_FOUND);
            throw new Error(`Contact not found with given id: ${req.params.id}`);
        }

        res.status(200).json(contact);
    }
)

// @desc Create a contact
// @route POST /api/contacts
// @access  private
// @status done
const createContact = asyncHandler(
    async (req, res) => {
        console.log(`The request body is ${req.body}`);
    
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("All fields are mandatory");
        }
     
        console.log(`User Id: ${req.user.id}, Name: ${name}, Email: ${email}, Phone: ${phone}`);
        const contact = await Contact.create({ user_id: req.user.id, name, email, phone });
        console.log(contact);
        res.status(201).json(contact);
    }
)

// @desc Update a contact with given id
// @route PUT /api/contacts/:id
// @access  private
// @status done
const updateContactWithId = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(constants.NOT_FOUND);
            throw new Error(`Contact not found with given id: ${req.params.id}`);
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(constants.FORBIDDEN);
            throw new Error("User doesn't have permission to access this contact");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedContact);
    }
)

// @desc Delete a contact with given id
// @route DELETE /api/contacts/:id
// @access  private
const deleteContactWithId = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(constants.NOT_FOUND);
            throw new Error(`Contact not found with given id: ${req.params.id}`);
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(constants.FORBIDDEN);
            throw new Error("User doesn't have permission to access this contact");
        }

        const deletedContact = await Contact.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedContact);
    }
)

module.exports = { getAllContacts, getContactWithId, createContact, updateContactWithId, deleteContactWithId };