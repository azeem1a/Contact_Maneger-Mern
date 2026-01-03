import { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../services/api';

const ContactList = ({ refreshTrigger }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch contacts from API
    const fetchContacts = async () => {
        try {
            setLoading(true);
            setError('');
            const contactData = await getContacts();
            setContacts(Array.isArray(contactData) ? contactData : []);
        } catch (err) {
            setError('Failed to load contacts. Please try again.');
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [refreshTrigger]);

    // Handle contact deletion
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            await deleteContact(id);
            setContacts((prev) => prev.filter((contact) => contact._id !== id));
        } catch (err) {
            alert('Failed to delete contact. Please try again.');
            console.error('Error deleting contact:', err);
        }
    };

    // Filter contacts based on search term
    const filteredContacts = Array.isArray(contacts)
        ? contacts.filter((contact) => {
              const name = contact.name?.toLowerCase() || '';
              const email = contact.email?.toLowerCase() || '';
              const phone = String(contact.phone ?? '');
              const term = searchTerm.toLowerCase();
              return name.includes(term) || email.includes(term) || phone.includes(searchTerm);
          })
        : [];

    if (loading) {
        return <div className="bg-white/90 border border-sky-100 rounded-2xl p-5 w-full shadow-xl shadow-sky-100/80 text-slate-600 text-center">Loading contacts...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white/90 border border-sky-100 rounded-2xl p-6 w-full shadow-xl shadow-sky-100/80 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Contact List</h2>
                <span className="text-[11px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 rounded-full shadow-sm">Live</span>
            </div>
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Contact"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/70 text-sm placeholder-slate-400"
                />
            </div>

            {/* Table */}
            {filteredContacts.length === 0 ? (
                <div className="text-center py-10 border border-gray-100 rounded-xl bg-gray-50">
                    <p className="text-gray-500 text-sm">{searchTerm ? 'No contacts found.' : 'No contacts yet.'}</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg shadow-slate-100/70">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredContacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-sky-50/60 transition">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-slate-900">{contact.name}</div>
                                        {/* Message displayed subtly to prevent clutter but remain available */}
                                        {contact.message && <div className="text-xs text-slate-500 italic truncate max-w-[220px]">{contact.message}</div>}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800 font-medium">
                                        {contact.phone}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800">
                                        {contact.email}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContactList;
