import React, { useState, useEffect } from 'react';
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
  Chip,
  CircularProgress
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
import { database } from '../firebase';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { format } from 'date-fns';
import tr from 'date-fns/locale/tr';

const HomePage = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase'den etkinlikleri çeken fonksiyon
  useEffect(() => {
    const duyurularRef = ref(database, 'duyurular');
    
    onValue(duyurularRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Objeyi diziye çevirip filtreleme işlemi
        const duyurularArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        // Sadece tipi "Etkinlik" olan ve aktif olan duyuruları filtreleme
        const activeEvents = duyurularArray.filter(duyuru => 
          duyuru.aktif && duyuru.tip === "Etkinlik"
        );
        
        // Tarihe göre sıralama (en yakın tarihli olanlar önce)
        const sortedEvents = activeEvents.sort((a, b) => {
          const dateA = new Date(a.tarih);
          const dateB = new Date(b.tarih);
          return dateA - dateB;
        });
        
        // Sadece gelecek etkinlikleri gösterme
        const futureEvents = sortedEvents.filter(event => {
          const eventDate = new Date(event.tarih);
          return eventDate >= new Date();
        });
        
        // En fazla 3 etkinliği alma
        const limitedEvents = futureEvents.slice(0, 3);
        
        setEvents(limitedEvents);
      } else {
        setEvents([]);
      }
      setLoading(false);
    });
    
    return () => {
      // Cleanup
    };
  }, []);

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

  // Tarih formatını düzenleyen fonksiyon
  const formatEventDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Tarih belirtilmemiş';
      }
      return format(date, 'd MMMM yyyy', { locale: tr });
    } catch (error) {
      console.error("Tarih formatı hatası:", error);
      return 'Geçersiz tarih formatı';
    }
  };

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

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : events.length > 0 ? (
            <Grid container spacing={4}>
              {events.map((event, index) => (
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
                      {event.resim && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={event.resim}
                          alt={event.baslik}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" component="h3" fontWeight="bold">
                            {event.baslik}
                          </Typography>
                          <Chip 
                            label={event.tip} 
                            color="primary" 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {event.kisaAciklama}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatEventDate(event.tarih)}
                          </Typography>
                        </Box>
                        {event.konum && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {event.konum}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          size="small" 
                          color="primary"
                          component={RouterLink}
                          to={`/events/${event.id}`}
                        >
                          Detaylar
                        </Button>
                        {event.target && (
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="primary"
                            href={event.target}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ ml: 'auto' }}
                          >
                            Kaydol
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Şu anda yaklaşan etkinlik bulunmamaktadır.
              </Typography>
            </Paper>
          )}
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
                <Box sx={{ mb: 3, flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    • Günlük 20 soru çözme hakkı
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Temel istatistikler
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Reklam destekli
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  color="primary"
                  component={RouterLink}
                  to="/register"
                  fullWidth
                >
                  Kaydol
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
                  border: 3,
                  borderColor: 'primary.main',
                  boxShadow: 10,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 15,
                    right: -30,
                    transform: 'rotate(45deg)',
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 4,
                    py: 0.5,
                    width: 150
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    En Popüler
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Chip label="Premium" color="primary" />
                </Box>
                <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                  Premium
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ₺39.99/ay
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3, flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    • Sınırsız soru çözme
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Detaylı istatistikler ve analiz
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Özel soru setleri
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Reklamsız deneyim
                  </Typography>
                  <Typography variant="body1" paragraph>
                    • Çevrimdışı kullanım
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  component={RouterLink}
                  to="/register?plan=premium"
                  fullWidth
                >
                  Hemen Başla
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