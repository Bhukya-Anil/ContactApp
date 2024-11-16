# Contact Management App
Description
The Contact Management App allows users to add, edit, and manage their contact information. The app provides a simple interface for managing contacts including first name, last name, email, phone number, company, and job title. It uses a MongoDB database to store contact data and provides RESTful API endpoints for communication between the frontend and backend.

Features:
Add new contacts.
Edit existing contacts.
Simple form validation.
Backend integration with a REST API.
Store data in MongoDB.

Technologies Used:
Frontend: React, Material-UI
Backend: Node.js, Express
Database: MongoDB
API Communication: Axios

Prerequisites
Before setting up the project, make sure you have the following installed:
Node.js (version 14.x or later)
MongoDB (local or cloud MongoDB instance)

Setup Instructions
1. Clone the Repository
First, clone the repository to your local machine:
https://github.com/Bhukya-Anil/ContactApp.git
cd ContactApp

2. Install Dependencies for the Backend
Navigate to the backend folder and install the required dependencies:

cd server
npm install

3. Install Dependencies for the Frontend
Navigate to the frontend folder and install the required dependencies:

cd frontend
npm install

4. Configure MongoDB
If using a local MongoDB server, ensure it is running.
If using MongoDB Atlas, create a free cluster and get the connection string.
Create a .env file in the backend directory and add your MongoDB URI:

MONGO_URI=mongodb://localhost:27017/contactDB  # For local MongoDB
Or use the MongoDB Atlas URI:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/contactDB  # MongoDB Atlas

5. Start the Backend Server
Navigate to the backend folder and start the server:
cd server
nodemon server.js
This will start the backend server on http://localhost:5000.

6. Start the Frontend Server
Navigate to the frontend folder and start the React development server:
cd frontend
npm start
This will start the frontend application on http://localhost:3000.

Now, your Contact Management App should be running locally!

Database Schema
Contacts Collection:
This schema represents the contacts in the MongoDB database.

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String },
    jobTitle: { type: String },
  },
  { timestamps: true }
);


API Routes:
POST /api/contacts: Adds a new contact.
PUT /api/contacts/:id: Updates an existing contact by ID.
GET /api/contacts: Retrieves all contacts.
DELETE /api/contacts/:id: Deletes a contact by ID.


How the App Works:
Frontend:
The React frontend consists of two main components: the ContactForm for adding or editing contacts and the ContactTable for displaying the list of contacts.
The ContactForm component sends POST requests to add a new contact or PUT requests to edit an existing contact.
The app dynamically updates the contact list on the frontend after a successful submission.

Backend:
The backend uses Express to handle API requests. It supports CRUD operations for contacts.
The backend connects to a MongoDB database, which stores the contact information in a collection called contacts.
The backend routes are responsible for adding, updating, fetching, and deleting contacts from the database.

Database:
MongoDB is used to store the contact data, which includes fields like first name, last name, email, phone, company, and job title.
Mongoose is used to define the schema for the contacts and interact with the MongoDB database.

Major Technical Decisions:
React: Chosen for its component-based architecture, making the UI easy to manage and update.
Material-UI: Used for building responsive and user-friendly forms and UI components.
Express and Node.js: Provides a lightweight and flexible backend framework to handle API requests.
MongoDB: Chosen for its schema-less design, which allows easy storage of dynamic data like contact information.

Troubleshooting:
MongoDB Connection Issues: Ensure your MongoDB service is running and check the MongoDB URI in your .env file.
CORS Issues: If you face CORS issues, ensure CORS is configured in the Express backend.
