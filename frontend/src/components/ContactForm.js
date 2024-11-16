import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

const ContactForm = ({ editingContact, onFormSubmission }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await axios.put(
          `http://localhost:5000/api/contacts/${editingContact._id}`,
          formData
        );
        alert("Contact updated successfully!");
        
      } else {
        await axios.post("http://localhost:5000/api/contacts", formData);
        alert("Contact added successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            jobTitle: "",
          });

      }
      onFormSubmission(); 
    } catch (error) {
      alert("Email Already Exists");
      console.error("Error saving contact:", error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        m: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        mx: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        {editingContact ? "Update Contact" : "Add New Contact"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {editingContact ? "Update Contact" : "Add Contact"}
      </Button>
    </Box>
  );
};

export default ContactForm;
