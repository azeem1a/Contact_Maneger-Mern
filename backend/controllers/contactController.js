import Contact from '../models/Contact.js';

/**
 * @desc    Get all contacts
 * @route   GET /api/contacts
 * @access  Public
 */
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch contacts',
            error: error.message,
        });
    }
};

/**
 * @desc    Get single contact by ID
 * @route   GET /api/contacts/:id
 * @access  Public
 */
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error('Error fetching contact:', error);

        // Handle invalid MongoDB ID format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact ID format',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch contact',
            error: error.message,
        });
    }
};

/**
 * @desc    Create a new contact
 * @route   POST /api/contacts
 * @access  Public
 */
export const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and phone number',
            });
        }

        // Create new contact
        const contact = await Contact.create({
            name,
            email,
            phone,
            message: message || '',
        });

        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: contact,
        });
    } catch (error) {
        console.error('Error creating contact:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages,
            });
        }

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A contact with this email already exists',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to create contact',
            error: error.message,
        });
    }
};

/**
 * @desc    Update a contact
 * @route   PUT /api/contacts/:id
 * @access  Public
 */
export const updateContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Find and update contact
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, message },
            {
                new: true, // Return the updated document
                runValidators: true, // Run schema validators
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            data: contact,
        });
    } catch (error) {
        console.error('Error updating contact:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages,
            });
        }

        // Handle invalid MongoDB ID format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact ID format',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to update contact',
            error: error.message,
        });
    }
};

/**
 * @desc    Delete a contact
 * @route   DELETE /api/contacts/:id
 * @access  Public
 */
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully',
            data: {},
        });
    } catch (error) {
        console.error('Error deleting contact:', error);

        // Handle invalid MongoDB ID format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid contact ID format',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to delete contact',
            error: error.message,
        });
    }
};
