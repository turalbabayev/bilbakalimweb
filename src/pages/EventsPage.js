import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination
} from '@mui/material';
import { 
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('all');
  const [page, setPage] = useState(1);
  const eventsPerPage = 6;

  // Etkinlikler listesi (normalde API'den gelir)
  const allEvents = [
    {
      id: 1,
      title: 'YKS Hazırlık Stratejileri',
      date: '15 Mart 2023',
      time: '14:00 - 16:00',
      location: 'Online',
      image: '/events/event1.jpg',
      category: 'Seminer',
      description: 'YKS sınavına hazırlanan öğrenciler için stratejiler ve püf noktaları paylaşacağımız online seminer.',
      isFree: true
    },
    {
      id: 2,
      title: 'Soru Çözüm Teknikleri',
      date: '22 Mart 2023',
      time: '16:00 - 18:00',
      location: 'İstanbul',
      image: '/events/event2.jpg',
      category: 'Workshop',
      description: 'YKS ve TYT sınavlarında karşılaşılan zor sorulara yaklaşım ve çözüm teknikleri üzerine interaktif bir workshop.',
      isFree: false
    },
    {
      id: 3,
      title: 'Motivasyon ve Stres Yönetimi',
      date: '5 Nisan 2023',
      time: '15:30 - 17:00',
      location: 'Online',
      image: '/events/event3.jpg',
      category: 'Webinar',
      description: 'Sınav döneminde motivasyonu yüksek tutma ve stres yönetimi konusunda uzman psikologlarla webinar.',
      isFree: true
    },
    {
      id: 4,
      title: 'Matematik Problemleri Çözüm Kampı',
      date: '12-14 Nisan 2023',
      time: '10:00 - 16:00',
      location: 'Ankara',
      image: '/events/event4.jpg',
      category: 'Kamp',
      description: 'Üç günlük yoğun matematik problemi çözüm kampı. Uzman eğitimcilerle birlikte pratik yapma fırsatı.',
      isFree: false
    },
    {
      id: 5,
      title: 'Ebeveynler için Sınav Rehberliği',
      date: '20 Nisan 2023',
      time: '19:00 - 20:30',
      location: 'Online',
      image: '/events/event5.jpg',
      category: 'Seminer',
      description: 'Sınava hazırlanan öğrencilerin ebeveynleri için rehberlik ve destek semineri.',
      isFree: true
    },
    {
      id: 6,
      title: 'Fizik Formülleri ve Uygulamaları',
      date: '3 Mayıs 2023',
      time: '15:00 - 17:30',
      location: 'İzmir',
      image: '/events/event6.jpg',
      category: 'Workshop',
      description: 'AYT Fizik konularında formüllerin etkin kullanımı ve problem çözümü workshop\'u.',
      isFree: false
    },
    {
      id: 7,
      title: 'Paragraf Çözme Teknikleri',
      date: '10 Mayıs 2023',
      time: '16:00 - 17:30',
      location: 'Online',
      image: '/events/event7.jpg',
      category: 'Webinar',
      description: 'TYT Türkçe sınavında paragraf sorularını hızlı ve doğru çözme teknikleri.',
      isFree: true
    },
    {
      id: 8,
      title: 'Kimya Deneyleri Atölyesi',
      date: '17-18 Mayıs 2023',
      time: '13:00 - 16:00',
      location: 'İstanbul',
      image: '/events/event8.jpg',
      category: 'Atölye',
      description: 'AYT Kimya konularını deneylerle pekiştirme ve hafızada kalıcı hale getirme atölyesi.',
      isFree: false
    },
    {
      id: 9,
      title: 'Son Hafta Sınav Stratejisi',
      date: '1 Haziran 2023',
      time: '18:00 - 19:30',
      location: 'Online',
      image: '/events/event9.jpg',
      category: 'Seminer',
      description: 'YKS öncesi son hafta çalışma programı ve sınav stratejileri semineri.',
      isFree: true
    }
  ];

  // Filtreleme işlemleri
  const filteredEvents = allEvents.filter(event => {
    // Arama terimini kontrol et
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Etkinlik tipini kontrol et
    const matchesType = eventType === 'all' || event.category === eventType;
    
    return matchesSearch && matchesType;
  });

  // Sayfalama
  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);
  const displayedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  // Arama terimini değiştirme
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Arama yapıldığında ilk sayfaya dön
  };

  // Etkinlik tipini değiştirme
  const handleTypeChange = (event) => {
    setEventType(event.target.value);
    setPage(1); // Tip değiştiğinde ilk sayfaya dön
  };

  // Sayfa değiştirme
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Etkinlikler
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Bil Bakalım'ın düzenlediği seminer, workshop ve webinarlar ile sınava hazırlık sürecinizi destekleyin.
          </Typography>
        </Box>

        {/* Filtreleme araçları */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Etkinlik ara..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Etkinlik Tipi</InputLabel>
                <Select
                  value={eventType}
                  onChange={handleTypeChange}
                  label="Etkinlik Tipi"
                >
                  <MenuItem value="all">Tümü</MenuItem>
                  <MenuItem value="Seminer">Seminer</MenuItem>
                  <MenuItem value="Workshop">Workshop</MenuItem>
                  <MenuItem value="Webinar">Webinar</MenuItem>
                  <MenuItem value="Kamp">Kamp</MenuItem>
                  <MenuItem value="Atölye">Atölye</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Sonuçlar */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredEvents.length} etkinlik bulundu
          </Typography>
        </Box>

        {/* Etkinlikler */}
        <Grid container spacing={4}>
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={event.image}
                        alt={event.title}
                      />
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 16, 
                          right: 16,
                          zIndex: 1
                        }}
                      >
                        <Chip 
                          label={event.category} 
                          color="primary" 
                          size="small" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      {event.isFree && (
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 16, 
                            left: 16,
                            zIndex: 1
                          }}
                        >
                          <Chip 
                            label="Ücretsiz" 
                            color="success" 
                            size="small" 
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                        {event.title}
                      </Typography>
                      
                      <Box sx={{ my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EventIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        color={event.isFree ? "success" : "primary"} 
                        fullWidth
                      >
                        {event.isFree ? "Ücretsiz Kaydol" : "Satın Al ve Kaydol"}
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8, 
                  px: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Aramanıza uygun etkinlik bulunamadı
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Farklı arama terimleri veya filtreler deneyebilirsiniz
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSearchTerm('');
                    setEventType('all');
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Sayfalama */}
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default EventsPage; 