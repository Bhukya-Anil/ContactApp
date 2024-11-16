import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ContactTable = ({ onEdit }) => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");


  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedContacts = () => {
    return [...contacts].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        m: 2,
        p: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 2,
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Contact List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {[
                { id: "firstName", label: "First Name" },
                { id: "lastName", label: "Last Name" },
                { id: "email", label: "Email" },
                { id: "phone", label: "Phone" },
                { id: "company", label: "Company" },
                { id: "jobTitle", label: "Job Title" },
              ].map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sx={{
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedContacts()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => (
                <TableRow key={contact._id} hover>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(contact)}
                      sx={{
                        "&:hover": { color: "green" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(contact._id)}
                      sx={{
                        "&:hover": { color: "red" },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
};

export default ContactTable;
