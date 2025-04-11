import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  Paper,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Star as StarIcon,
  Apps as AppsIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AppDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Uygulama özellikleri
  const appFeatures = [
    {
      title: 'Kişiselleştirilmiş Deneyim',
      description: 'Öğrenme stilinize ve hazırlandığınız sınava göre size özel deneyim.',
      icon: <StarIcon color="primary" />
    },
    {
      title: 'Kapsamlı Soru Bankası',
      description: 'Binlerce soru ile dilediğiniz an pratik yapabilirsiniz.',
      icon: <AppsIcon color="secondary" />
    },
    {
      title: 'İstatistikler',
      description: 'Performansınızı takip edin, güçlü ve zayıf yönlerinizi keşfedin.',
      icon: <BarChartIcon color="success" />
    },
    {
      title: 'Bildirim Hatırlatmaları',
      description: 'Düzenli çalışma için özelleştirilebilir bildirim sistemi.',
      icon: <NotificationsIcon color="warning" />
    },
    {
      title: 'Premium İçerik',
      description: 'Premium üyelik ile ekstra sorulara ve özelliklere erişim.',
      icon: <LockIcon color="error" />
    }
  ];

  // Ekran görüntüleri
  const screenshots = [
    '/screenshots/screen1.jpg',
    '/screenshots/screen2.jpg',
    '/screenshots/screen3.jpg',
    '/screenshots/screen4.jpg'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Geri Dön
        </Button>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Bil Bakalım Uygulaması
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sınava hazırlık için tüm ihtiyaçlarınız tek bir uygulamada
        </Typography>
      </Box>

      {/* Uygulama Tanıtımı */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component="img"
              src="/app-mockup-large.png"
              alt="Bil Bakalım Uygulama"
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                display: 'block',
                mx: 'auto',
                borderRadius: 4,
                boxShadow: 6
              }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Neden Bil Bakalım?
            </Typography>
            <Typography variant="body1" paragraph>
              Bil Bakalım, sınavlara hazırlık sürecinizi kolaylaştırmak ve maksimum verim almanızı sağlamak için tasarlanmış yenilikçi bir mobil uygulamadır. Kişiselleştirilmiş öğrenme deneyimi, binlerce soru ve detaylı istatistiklerle sınav başarınızı artırmak için ideal çözüm.
            </Typography>
            
            <List>
              {appFeatures.slice(0, 3).map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={feature.title} 
                    secondary={feature.description}
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<DownloadIcon />}
                component="a"
                href="https://play.google.com/store"
                target="_blank"
                sx={{ px: 3, py: 1.2 }}
              >
                Google Play'den İndir
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<DownloadIcon />}
                component="a"
                href="https://apps.apple.com"
                target="_blank"
                sx={{ px: 3, py: 1.2 }}
              >
                App Store'dan İndir
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Ekran Görüntüleri */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          Ekran Görüntüleri
        </Typography>
        <Grid container spacing={2}>
          {screenshots.map((screenshot, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  component="img"
                  src={screenshot}
                  alt={`Ekran görüntüsü ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 4
                    }
                  }}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Özellikler Detayı */}
      <Paper sx={{ p: 4, mb: 8, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          Tüm Özellikler
        </Typography>
        <Grid container spacing={4}>
          {appFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: '50%', 
                      bgcolor: `${theme.palette.primary.main}15`,
                      display: 'flex'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Fiyatlandırma */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          Fiyatlandırma Planları
        </Typography>
        <Grid container spacing={4}>
          {/* Ücretsiz Plan */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  border: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Ücretsiz" color="default" />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    Ücretsiz
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    ₺0/ay
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    Temel özellikler ile başlayın
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Sınırlı soru erişimi" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Temel istatistikler" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Reklamlı kullanım" />
                    </ListItem>
                  </List>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    size="large"
                    component="a"
                    href="https://play.google.com/store"
                    target="_blank"
                  >
                    Hemen İndir
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
          
          {/* Premium Plan */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  border: 3,
                  borderColor: 'primary.main',
                  boxShadow: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible',
                  zIndex: 1
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -12, 
                    left: 0, 
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Chip label="En Popüler" color="primary" sx={{ fontSize: '0.9rem', py: 0.5 }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, mt: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Premium" color="primary" />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    Premium
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    ₺49.99/ay
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    Tam özellikli sınırsız erişim
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Sınırsız soru erişimi" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Detaylı istatistikler" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Reklamsız kullanım" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Kişiselleştirilmiş öğrenme planı" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Tüm etkinliklere özel erişim" />
                    </ListItem>
                  </List>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    component="a"
                    href="/register"
                  >
                    Şimdi Satın Al
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* İndirebilme CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          sx={{ 
            p: 4, 
            bgcolor: 'primary.main', 
            color: 'white', 
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Sınava Hazırlanmaya Hemen Başlayın
          </Typography>
          <Typography variant="h6" paragraph sx={{ maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
            Bil Bakalım uygulamasını indirin, başarı yolculuğunuza bugün başlayın.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 2,
              mt: 3 
            }}
          >
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              startIcon={<DownloadIcon />}
              component="a"
              href="https://play.google.com/store"
              target="_blank"
              sx={{ px: 4, py: 1.5 }}
            >
              Google Play'den İndir
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              startIcon={<DownloadIcon />}
              component="a"
              href="https://apps.apple.com"
              target="_blank"
              sx={{ px: 4, py: 1.5 }}
            >
              App Store'dan İndir
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AppDetailPage; 