import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { UserContext } from './UserContext';
import { Button, TextField, Typography, Container, Grid, CircularProgress, Box, ThemeProvider, createTheme } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hashedPassword = CryptoJS.SHA256(password).toString();

    try {
      const response = await axios.get('https://crudcrud.com/api/b0707a337b9f459380156b5032272ae0/users');
      let resdata = response.data.find(api => (api.email === email && api.password === hashedPassword));

      if (response.status === 200 && resdata) {
        localStorage.setItem('user', JSON.stringify(resdata));
        localStorage.setItem('isLoggedIn', true);
        setUser(resdata);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Please check your username and password.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#358864'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
          <Grid item lg={8} xs={12} sm={6}>
            <Box sx={{
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <img src="./assets/login-image.jpg" alt="SignIn" style={{ width: '80%', maxWidth: '100%', height: 'auto' }} />
            </Box>
          </Grid>

          <Grid item lg={4} xs={12} sm={6} sx={{
            textAlign: 'left'
          }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{
              textAlign: 'left'
            }}>
              Sign In
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading} sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </form>
            <Box mt={2} textAlign="center">
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account? <Button color="primary" onClick={() => navigate('/signup')} sx={{ textTransform: 'capitalize' }}>Sign Up</Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
