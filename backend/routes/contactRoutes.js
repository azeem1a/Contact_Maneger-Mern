import express from 'express';
import {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

/**
 * Contact Routes
 * All routes are prefixed with /api/contacts
 */

// Get all contacts & Create new contact
router.route('/')
    .get(getContacts)      // GET /api/contacts
    .post(createContact);  // POST /api/contacts

// Get, Update, and Delete single contact by ID
router.route('/:id')
    .get(getContact)       // GET /api/contacts/:id
    .put(updateContact)    // PUT /api/contacts/:id
    .delete(deleteContact); // DELETE /api/contacts/:id

export default router;
