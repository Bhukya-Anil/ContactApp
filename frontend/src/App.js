import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import "./App.css";

function App() {
  const [editingContact, setEditingContact] = useState(null);

  const handleEdit = (contact) => {
    setEditingContact(contact); 
  };

  const handleFormSubmission = () => {
    setEditingContact(null);
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
