import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user.username === username && user.password === password) {
          localStorage.setItem('loggedIn', 'true');
          setError('');
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      } catch (e) {
        setError('An error occurred. Please try again.');
        console.error('Error parsing user data:', e);
      }
    } else {
      setError('No registered user found. Please sign up first.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 4, sm: 8 }
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: { xs: 3, sm: 4 },
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'white'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3
            }}
          >
            <Box 
              sx={{ 
                bgcolor: 'primary.main', 
                borderRadius: '50%', 
                p: 1, 
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white' }} />
            </Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              fontWeight="bold" 
              align="center"
              gutterBottom
            >
              Login
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
            >
              Enter your credentials to access your account
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            noValidate 
            autoComplete="off" 
            onSubmit={handleLogin}
          >
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              autoFocus
              InputProps={{
                sx: { borderRadius: 1.5 }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                sx: { borderRadius: 1.5 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.2,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Login
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/Signup')}
                  sx={{ 
                    p: 0, 
                    minWidth: 'auto', 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Login;
