import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Link,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Lütfen e-posta adresinizi girin');
      setAlertOpen(true);
      return;
    }

    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      await resetPassword(email);
      
      setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
      setAlertOpen(true);
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      setError('Şifre sıfırlama işlemi başarısız oldu. Lütfen geçerli bir e-posta adresi girdiğinizden emin olun');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Şifremi Unuttum
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Şifrenizi sıfırlamak için e-posta adresinizi girin
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Şifre Sıfırlama Bağlantısı Gönder'
              )}
            </Button>
            
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Giriş sayfasına dön
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Hesabınız yok mu?{' '}
            <Link component={RouterLink} to="/register">
              Hemen Kaydolun
            </Link>
          </Typography>
        </Box>
      </motion.div>
      
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleAlertClose} 
          severity={error ? 'error' : 'success'} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {error || message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPasswordPage; 