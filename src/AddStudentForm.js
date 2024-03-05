import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddStudentForm = ({ handleAddStudentSubmit }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!student.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!student.department.trim()) {
      newErrors.department = 'Department is required';
      valid = false;
    }

    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(student.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleAddStudentSubmit(student);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={student.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          value={student.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Department"
          name="department"
          value={student.department}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.department}
          helperText={errors.department}
        />
        <Button type="submit" variant="contained" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Add Student
        </Button>
      </form>
    </>
  );
};

export default AddStudentForm;
