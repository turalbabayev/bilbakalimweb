import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon 
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Bil Bakalım
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Bilgini test et, sınava hazırlan, başarıyı yakala!
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" component="a" href="#" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Hızlı Bağlantılar
            </Typography>
            <Box>
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                Ana Sayfa
              </Link>
              <Link 
                component={RouterLink} 
                to="/questions" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                Sorular
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                Hakkımızda
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                İletişim
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Bölümler
            </Typography>
            <Box>
              <Link 
                component={RouterLink} 
                to="/categories/tyt" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                TYT
              </Link>
              <Link 
                component={RouterLink} 
                to="/categories/ayt" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                AYT
              </Link>
              <Link 
                component={RouterLink} 
                to="/categories/lgs" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                LGS
              </Link>
              <Link 
                component={RouterLink} 
                to="/categories/kpss" 
                color="inherit" 
                underline="hover"
                sx={{ display: 'block', mb: 1 }}
              >
                KPSS
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2" paragraph>
              Adres: İstanbul, Türkiye
            </Typography>
            <Typography variant="body2" paragraph>
              E-posta: info@bilbakalim.com
            </Typography>
            <Typography variant="body2">
              Telefon: +90 555 123 4567
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            &copy; {currentYear} Bil Bakalım. Tüm hakları saklıdır.
          </Typography>
          <Box>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="inherit" 
              underline="hover"
              sx={{ mx: 1 }}
            >
              Gizlilik Politikası
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="inherit" 
              underline="hover"
              sx={{ mx: 1 }}
            >
              Kullanım Şartları
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 