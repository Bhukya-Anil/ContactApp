import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import "./App.css";

function App() {
  const [editingContact, setEditingContact] = useState(null);

  const handleEdit = (contact) => {
    setEditingContact(contact); // Pass the contact to the form for editing
  };

  const handleFormSubmission = () => {
    setEditingContact(null); // Reset the editingContact after submission
  };

  return (
    <div>
      <h1>Contact Management</h1>
      <ContactForm
        editingContact={editingContact}
        onFormSubmission={handleFormSubmission}
      />
      <h2>Table</h2>
      <ContactTable onEdit={handleEdit} />
    </div>
  );
}

export default App;
