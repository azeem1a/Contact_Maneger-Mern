import { useState } from 'react';
import { createContact } from '../services/api';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const newContact = await createContact(formData);

            setSuccessMessage('Contact added successfully!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });

            if (onContactAdded) {
                onContactAdded(newContact);
            }

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setErrors({
                submit: error.message || 'Failed to add contact. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

    return (
        <div className="bg-white/90 border border-sky-100 rounded-2xl p-6 w-full shadow-xl shadow-sky-100/80 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Add Contact</h2>
                <span className="text-[11px] font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 px-2.5 py-1 rounded-full shadow-sm">New</span>
            </div>
            {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{successMessage}</span>
                </div>
            )}

            {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`w-full px-3.5 py-3 rounded-xl border bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500 text-slate-800 placeholder-slate-400 text-sm transition ${errors.name ? 'border-red-300' : 'border-slate-200'
                            }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Phone - Reordered to match image (2nd) */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`w-full px-3.5 py-3 rounded-xl border bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500 text-slate-800 placeholder-slate-400 text-sm transition ${errors.phone ? 'border-red-300' : 'border-slate-200'
                            }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Email - Reordered to match image (3rd) */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`w-full px-3.5 py-3 rounded-xl border bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500 text-slate-800 placeholder-slate-400 text-sm transition ${errors.email ? 'border-red-300' : 'border-slate-200'
                            }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Message - Kept as requested, matches style */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message (Optional)"
                        rows="3"
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500 text-slate-800 placeholder-slate-400 text-sm resize-none transition"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3 rounded-xl font-semibold text-white text-sm shadow-lg shadow-sky-200 transition ${!isFormValid || isSubmitting
                            ? 'bg-sky-200 cursor-not-allowed'
                            : 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-600'
                        }`}
                >
                    {isSubmitting ? 'Adding...' : 'Add Contact'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
