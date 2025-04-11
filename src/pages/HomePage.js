import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box,
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  Paper,
  Divider,
  useTheme,
  Chip
} from '@mui/material';
import { 
  PhoneAndroid as PhoneAndroidIcon,
  EventAvailable as EventAvailableIcon,
  School as SchoolIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const HomePage = () => {
  const theme = useTheme();

  // Yaklaşan Etkinlikler
  const upcomingEvents = [
    {
      id: 1,
      title: 'YKS Hazırlık Stratejileri',
      date: '15 Mart 2023',
      time: '14:00',
      location: 'Online',
      image: '/events/event1.jpg',
      category: 'Seminer'
    },
    {
      id: 2,
      title: 'Soru Çözüm Teknikleri',
      date: '22 Mart 2023',
      time: '16:00',
      location: 'İstanbul',
      image: '/events/event2.jpg',
      category: 'Workshop'
    },
    {
      id: 3,
      title: 'Motivasyon ve Stres Yönetimi',
      date: '5 Nisan 2023',
      time: '15:30',
      location: 'Online',
      image: '/events/event3.jpg',
      category: 'Webinar'
    }
  ];

  // Uygulama Özellikleri
  const appFeatures = [
    {
      title: 'Kişiselleştirilmiş Deneyim',
      description: 'Öğrenme stilinize ve hazırlandığınız sınava göre size özel deneyim sunuyoruz.',
      icon: <StarIcon fontSize="large" color="primary" />
    },
    {
      title: 'Kapsamlı Soru Bankası',
      description: 'Binlerce soru ile dilediğiniz an pratik yapabilirsiniz.',
      icon: <SchoolIcon fontSize="large" color="secondary" />
    },
    {
      title: 'Gerçek Zamanlı İstatistikler',
      description: 'Performansınızı takip edin, güçlü ve zayıf yönlerinizi keşfedin.',
      icon: <PhoneAndroidIcon fontSize="large" color="success" />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 12,
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                  Bil Bakalım ile
                  <br />
                  Sınava Hazırlanmak
                  <br />
                  Artık Çok Kolay
                </Typography>
                <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                  Kişiselleştirilmiş öğrenme deneyimi, binlerce soru ve detaylı istatistikler ile hayalinizdeki okula bir adım daha yaklaşın.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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
                    Google Play
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
                    App Store
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Box 
                  component="img"
                  src="/app-mockup.png"
                  alt="Bil Bakalım Uygulama"
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    display: 'block',
                    mx: 'auto',
                    borderRadius: 4,
                    boxShadow: 6
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Özellikler Bölümü */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            Bil Bakalım'ın Özellikleri
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Uygulamamız, sınava hazırlık sürecinizi kolaylaştıracak ve verimli hale getirecek birçok özellik sunuyor.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {appFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper 
                  sx={{ 
                    p: 4, 
                    height: '100%', 
                    textAlign: 'center',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Etkinlikler Bölümü */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Yaklaşan Etkinlikler
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              endIcon={<ArrowForwardIcon />}
              component={RouterLink}
              to="/events"
            >
              Tüm Etkinlikler
            </Button>
          </Box>

          <Grid container spacing={4}>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} md={4} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 4
                      } 
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image}
                      alt={event.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h3" fontWeight="bold">
                          {event.title}
                        </Typography>
                        <Chip 
                          label={event.category} 
                          color="primary" 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.date}, {event.time}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button size="small" color="primary">
                        Detaylar
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        sx={{ ml: 'auto' }}
                      >
                        Kaydol
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* İndir CTA Bölümü */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Hemen Şimdi İndirin!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
              Binlerce soru ve kişiselleştirilmiş öğrenme deneyimi ile sınavlara hazırlanmak için Bil Bakalım'ı hemen indirin.
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3, 
                justifyContent: 'center',
                mt: 4 
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
          </motion.div>
        </Container>
      </Box>

      {/* Abonelik Planları */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            Abonelik Planları
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Bil Bakalım'ın tüm özelliklerinden faydalanmak için size uygun abonelik planını seçin.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Ücretsiz Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Chip label="Ücretsiz" color="default" />
                </Box>
                <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                  Ücretsiz
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  ₺0/ay
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    Temel özelliklere erişim
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Sınırlı soru erişimi
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Temel istatistikler
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Reklamlı kullanım
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="large"
                  component="a"
                  href="https://play.google.com/store"
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  Hemen İndir
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Premium Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 4,
                  borderColor: 'primary.main',
                  position: 'relative',
                  boxShadow: 8,
                  transform: { sm: 'scale(1.05)' },
                  zIndex: 2
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
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Chip label="Premium" color="primary" />
                </Box>
                <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                  Premium
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  ₺49.99/ay
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    Tam özellikli sınırsız erişim
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Sınırsız soru erişimi
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Detaylı istatistikler
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Reklamsız kullanım
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Kişiselleştirilmiş öğrenme planı
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Tüm etkinliklere özel erişim
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{ mt: 2 }}
                >
                  Şimdi Satın Al
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 