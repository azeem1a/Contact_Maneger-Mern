import mongoose from 'mongoose';

/**
 * Contact Schema Definition
 * Defines the structure of a contact document in MongoDB
 */
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [500, 'Message cannot be more than 500 characters'],
            default: '',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Create indexes for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ name: 1 });

// Create and export the model
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
