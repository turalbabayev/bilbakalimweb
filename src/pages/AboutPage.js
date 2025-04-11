import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Divider, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  History as HistoryIcon,
  People as PeopleIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Kurucu & CEO',
      bio: 'Eğitim sektöründe 15+ yıllık deneyime sahip. İstanbul Üniversitesi Bilgisayar Mühendisliği mezunu.',
      avatar: '/team/team1.jpg'
    },
    {
      name: 'Ayşe Kaya',
      role: 'İçerik Direktörü',
      bio: 'ODTÜ Matematik Eğitimi mezunu. 10+ yıllık öğretmenlik deneyimi ile binlerce öğrencinin sınavlara hazırlanmasına yardımcı oldu.',
      avatar: '/team/team2.jpg'
    },
    {
      name: 'Mehmet Demir',
      role: 'Teknoloji Direktörü',
      bio: 'Boğaziçi Üniversitesi Bilgisayar Mühendisliği mezunu. EdTech alanında uzmanlaşmış yazılım geliştirici.',
      avatar: '/team/team3.jpg'
    }
  ];

  const values = [
    {
      title: 'Kalite',
      description: 'Her sorunun doğruluğunu ve güncelliğini titizlikle kontrol ediyoruz.',
      icon: <CheckCircleIcon color="primary" fontSize="large" />
    },
    {
      title: 'Erişilebilirlik',
      description: 'Kaliteli eğitim içeriğine herkesin erişebilmesi için çalışıyoruz.',
      icon: <PeopleIcon color="secondary" fontSize="large" />
    },
    {
      title: 'Yenilikçilik',
      description: 'Eğitim teknolojilerindeki yenilikleri takip ederek platformumuzu sürekli geliştiriyoruz.',
      icon: <LightbulbIcon color="success" fontSize="large" />
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Üst başlık bölümü */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Hakkımızda
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Bil Bakalım, öğrencilerin sınavlara daha etkili hazırlanmasını sağlayan yenilikçi bir online soru bankası platformudur.
          </Typography>
        </motion.div>
      </Box>

      {/* Hikayemiz bölümü */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                Hikayemiz
              </Typography>
              <Typography variant="body1" paragraph>
                Bil Bakalım, 2020 yılında bir grup eğitimci ve yazılım geliştiricisi tarafından kuruldu. Amacımız, Türkiye'deki öğrencilerin sınavlara hazırlanma süreçlerini daha verimli ve etkili hale getirmekti.
              </Typography>
              <Typography variant="body1" paragraph>
                Başlangıçta sadece TYT soruları ile başladık, ancak kısa sürede platformumuzu genişleterek AYT, LGS ve KPSS gibi farklı sınav türlerini de kapsayacak şekilde geliştirdik.
              </Typography>
              <Typography variant="body1">
                Bugün binlerce öğrenciye hizmet veren Bil Bakalım, sürekli büyümeye ve gelişmeye devam ediyor. Öğrencilerin başarısı için çalışmaya ve eğitim teknolojilerinde yenilikler sunmaya devam edeceğiz.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <Box 
              component="img"
              src="/about-story.jpg"
              alt="Bil Bakalım Hikayesi"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </motion.div>
        </Grid>
      </Grid>

      {/* Misyon ve Vizyon */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Paper sx={{ p: 4, height: '100%', borderLeft: '4px solid', borderColor: 'primary.main' }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Misyonumuz
                </Typography>
                <Typography variant="body1" paragraph>
                  Öğrencilere, sınavlara hazırlanma süreçlerinde ihtiyaç duydukları kaliteli içeriği, teknolojinin tüm imkanlarını kullanarak sunmak ve öğrenme yolculuklarında onlara rehberlik etmek.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Kaliteli soru içeriği oluşturmak" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Kişiselleştirilmiş öğrenme deneyimi sunmak" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Sınav başarısını artırmak" />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <Paper sx={{ p: 4, height: '100%', borderLeft: '4px solid', borderColor: 'secondary.main' }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Vizyonumuz
                </Typography>
                <Typography variant="body1" paragraph>
                  Türkiye'nin en kapsamlı ve yenilikçi online soru bankası platformu olmak ve eğitimde fırsat eşitliğine katkıda bulunmak.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Eğitimde teknoloji kullanımında öncü olmak" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Her öğrencinin potansiyelini maksimuma çıkarmasına yardımcı olmak" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Öğrenmeyi eğlenceli ve etkili hale getirmek" />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Değerlerimiz */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Değerlerimiz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          Bil Bakalım'ı oluşturan temel değerler ve prensipler
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Ekibimiz */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ textAlign: 'center' }}>
          Ekibimiz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4, textAlign: 'center' }}>
          Bil Bakalım'ı oluşturan uzman kadromuz
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 2,
                        border: '4px solid',
                        borderColor: 'primary.light'
                      }}
                    />
                    <Typography variant="h6" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* İletişim CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Bize Ulaşın
          </Typography>
          <Typography variant="body1" paragraph>
            Sorularınız veya önerileriniz için iletişim formunu doldurabilir veya doğrudan bize e-posta gönderebilirsiniz.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ mx: 1, px: 3 }}
            >
              İletişim Formu
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              component="a"
              href="mailto:info@bilbakalim.com"
              sx={{ mx: 1, px: 3 }}
            >
              E-posta Gönder
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AboutPage; 