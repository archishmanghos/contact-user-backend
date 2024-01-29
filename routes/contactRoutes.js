const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    getContactWithId,
    createContact,
    updateContactWithId,
    deleteContactWithId
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateJwtToken');


router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContactWithId).put(updateContactWithId).delete(deleteContactWithId);

module.exports = router;