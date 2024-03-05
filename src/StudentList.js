import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddStudentForm from './AddStudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ id: '', name: '', email: '', department: '' });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const apiEndpoint = 'https://65e6c014d7f0758a76e8eefb.mockapi.io/user/students';

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const editStudent = async () => {
    try {
      await axios.put(`${apiEndpoint}/${editedStudent.id}`, editedStudent);
      const updatedStudents = students.map((student) =>
        student.id === editedStudent.id ? editedStudent : student
      );
      setStudents(updatedStudents);
      setOpenEditDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStudentConfirmation = (student) => {
    setDeleteConfirmation(true);
    setStudentToDelete(student);
  };

  const deleteStudent = async () => {
    try {
      await axios.delete(`${apiEndpoint}/${studentToDelete.id}`);
      const updatedStudents = students.filter((student) => student.id !== studentToDelete.id);
      setStudents(updatedStudents);
      setDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  const handleAddStudent = () => {
    setOpenAddDialog(true);
  };

  const handleAddStudentClose = () => {
    setOpenAddDialog(false);
  };

  const handleAddStudentSubmit = async (newStudent) => {
    try {
      const response = await axios.post(apiEndpoint, newStudent);
      const updatedStudents = [...students, response.data];
      setStudents(updatedStudents);
      setOpenAddDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Button variant="contained" style={{ backgroundColor: '#358864', color: '#ffffff', marginTop: '1rem', marginBottom: '1rem' }} onClick={handleAddStudent}>
        Add Student
      </Button>
      {students.length > 0 && (
        <Paper style={{ overflowX: 'auto' }}>
          <Table style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { setEditedStudent(student); setOpenEditDialog(true); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudentConfirmation(student)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={editedStudent.name}
            onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={editedStudent.email}
            onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="department"
            label="Department"
            type="text"
            fullWidth
            value={editedStudent.department}
            onChange={(e) => setEditedStudent({ ...editedStudent, department: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editStudent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this student?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteStudent} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddDialog} onClose={handleAddStudentClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <AddStudentForm handleClose={handleAddStudentClose} handleAddStudentSubmit={handleAddStudentSubmit} />
        </DialogContent>
      </Dialog>
    </Container>
  );

};

export default StudentList;
