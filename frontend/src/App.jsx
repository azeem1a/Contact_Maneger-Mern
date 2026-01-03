import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  // State to trigger refresh of contact list when a new contact is added
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handler called when a new contact is added successfully
  const handleContactAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-100 flex flex-col font-sans">
      <header className="w-full flex flex-col items-center pt-10 pb-6 space-y-3">
        <div className="px-4 py-2 rounded-full bg-white/60 text-xs font-semibold text-sky-700 border border-white/70 shadow-sm">
          Smart & Simple Contact Workspace
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight drop-shadow-sm">Contact Manager</h1>
        <p className="text-sm md:text-base text-slate-600">Colorful, calm, and organized — manage your contacts with confidence.</p>
      </header>

      <div className="flex justify-center w-full pb-12">
        <div className="w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <ContactForm onContactAdded={handleContactAdded} />
            <ContactList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
