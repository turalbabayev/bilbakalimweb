import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Snackbar,
  Alert,
  MenuItem,
  Card,
  CardContent,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationOnIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const subjects = [
    'Genel Bilgi',
    'Teknik Destek',
    'İş Birliği',
    'Öneri/Geri Bildirim',
    'Diğer'
  ];

  const contactInfo = [
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: 'E-posta',
      content: 'info@bilbakalim.com',
      link: 'mailto:info@bilbakalim.com'
    },
    {
      icon: <PhoneIcon fontSize="large" color="secondary" />,
      title: 'Telefon',
      content: '+90 555 123 4567',
      link: 'tel:+905551234567'
    },
    {
      icon: <LocationOnIcon fontSize="large" color="success" />,
      title: 'Adres',
      content: 'İstanbul, Türkiye',
      link: 'https://maps.google.com/?q=Istanbul,Turkey'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Konu seçiniz';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gereklidir';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Firebase Firestore'a mesajı kaydet
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      
      // Başarılı mesaj göster
      setAlert({
        open: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
        severity: 'success'
      });
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      setAlert({
        open: true,
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight="bold" 
          sx={{ textAlign: 'center', mb: 1 }}
        >
          İletişim
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}
        >
          Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
        </Typography>
        
        {/* İletişim Bilgileri */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 2,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {info.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      component="a" 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {info.content}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* İletişim Formu */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Bize Mesaj Gönderin
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Formun tüm alanlarını doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağız.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Ad Soyad"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="E-posta Adresi"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      label="Konu"
                      name="subject"
                      select
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      disabled={loading}
                    >
                      <MenuItem value="" disabled>
                        Konu Seçiniz
                      </MenuItem>
                      {subjects.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      label="Mesajınız"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      disabled={loading}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ height: '100%' }}>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385398.5897809314!2d28.731973441508392!3d41.00498228699284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1623164186564!5m2!1str!2str"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: 8, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Bil Bakalım Konum"
                  aria-label="Bil Bakalım Konum"
                />
                
                <Paper sx={{ p: 3, mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Çalışma Saatleri
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Pazartesi - Cuma:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        09:00 - 18:00
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Cumartesi:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        10:00 - 15:00
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Pazar:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Kapalı
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
      
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage; 