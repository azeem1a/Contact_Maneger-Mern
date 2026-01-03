import axios from 'axios';

// Base URL for API - Change this to your deployed backend URL when deploying
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Create a new contact
 * @param {Object} contactData - Contact information
 * @returns {Promise} API response
 */
export const createContact = async (contactData) => {
    try {
        const response = await api.post('/contacts', contactData);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get all contacts
 * @returns {Promise} API response with contacts array
 */
export const getContacts = async () => {
    try {
        const response = await api.get('/contacts');
        return response.data.data || [];
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete a contact by ID
 * @param {string} id - Contact ID
 * @returns {Promise} API response
 */
export const deleteContact = async (id) => {
    try {
        const response = await api.delete(`/contacts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;
