import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar, 
  Button, 
  Divider, 
  TextField, 
  Tabs, 
  Tab, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  IconButton
} from '@mui/material';
import { 
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Equalizer as EqualizerIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const ProfilePage = () => {
  const { currentUser, userProfile, fetchUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [activityHistory, setActivityHistory] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
      });
    }
  }, [userProfile]);
  
  useEffect(() => {
    const fetchActivityHistory = async () => {
      if (!currentUser) return;
      
      setActivityLoading(true);
      try {
        // Kullanıcının cevapladığı soruları getir
        const answersQuery = query(
          collection(db, "user_answers"),
          where("userId", "==", currentUser.uid),
          orderBy("answeredAt", "desc")
        );
        
        const answersSnapshot = await getDocs(answersQuery);
        const activities = [];
        
        answersSnapshot.forEach((doc) => {
          const data = doc.data();
          activities.push({
            id: doc.id,
            type: 'answer',
            questionTitle: data.questionTitle || 'Soru',
            date: data.answeredAt.toDate(),
            correct: data.isCorrect,
            category: data.category || 'Genel',
            questionId: data.questionId
          });
        });
        
        setActivityHistory(activities);
      } catch (error) {
        console.error("Aktivite geçmişi yüklenirken hata:", error);
      } finally {
        setActivityLoading(false);
      }
    };
    
    fetchActivityHistory();
  }, [currentUser]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      // Firestore'da kullanıcı profilini güncelle
      await updateDoc(doc(db, "users", currentUser.uid), {
        name: formData.name,
        phone: formData.phone,
        updatedAt: new Date()
      });
      
      // Profil bilgilerini yeniden yükle
      await fetchUserProfile(currentUser.uid);
      
      setAlert({
        open: true,
        message: 'Profil bilgileriniz başarıyla güncellendi.',
        severity: 'success'
      });
      
      setEditMode(false);
    } catch (error) {
      console.error("Profil güncellenirken hata:", error);
      setAlert({
        open: true,
        message: 'Profil bilgileriniz güncellenirken bir hata oluştu.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  
  const handleCancelEdit = () => {
    // Formda yapılan değişiklikleri iptal et
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
      });
    }
    setEditMode(false);
  };

  // Kullanıcı istatistikleri (örnek)
  const userStats = [
    { title: 'Çözülen Soru', value: activityHistory.length, icon: <SchoolIcon color="primary" /> },
    { title: 'Doğru Cevap', value: activityHistory.filter(a => a.correct).length, icon: <CheckIcon color="success" /> },
    { title: 'Başarı Oranı', value: activityHistory.length > 0 ? `%${Math.round((activityHistory.filter(a => a.correct).length / activityHistory.length) * 100)}` : '%0', icon: <StarIcon color="warning" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Sol taraftaki profil kartı */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mb: 2
                  }}
                >
                  {userProfile?.name?.charAt(0) || currentUser?.email?.charAt(0)}
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom>
                  {userProfile?.name || 'Kullanıcı'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Üyelik: {userProfile?.createdAt ? format(userProfile.createdAt.toDate(), 'MMMM yyyy', { locale: tr }) : 'Bilinmiyor'}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Kullanıcı istatistikleri */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  İstatistikler
                </Typography>
                <Grid container spacing={2}>
                  {userStats.map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ mb: 1 }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Hızlı erişim */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Hızlı Erişim
                </Typography>
                <List sx={{ p: 0 }}>
                  <ListItem 
                    button 
                    component="a" 
                    href="/questions"
                    sx={{ borderRadius: 1 }}
                  >
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Tüm Sorular" />
                  </ListItem>
                  <ListItem 
                    button 
                    component="a" 
                    href="/game"
                    sx={{ borderRadius: 1 }}
                  >
                    <ListItemIcon>
                      <StarIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Oyun Modu" />
                  </ListItem>
                  <ListItem 
                    button 
                    component="a" 
                    href="/settings"
                    sx={{ borderRadius: 1 }}
                  >
                    <ListItemIcon>
                      <LockIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary="Şifre Değiştir" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          
          {/* Sağ taraftaki içerik */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="profile tabs">
                  <Tab icon={<PersonIcon />} label="Profil Bilgileri" id="tab-0" />
                  <Tab icon={<HistoryIcon />} label="Aktivite Geçmişi" id="tab-1" />
                  <Tab icon={<EqualizerIcon />} label="Performans" id="tab-2" />
                </Tabs>
              </Box>
              
              {/* Profil Bilgileri */}
              {activeTab === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" component="h2">
                      Profil Bilgileri
                    </Typography>
                    {editMode ? (
                      <Box>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          onClick={handleCancelEdit}
                          startIcon={<CloseIcon />}
                          sx={{ mr: 1 }}
                          disabled={loading}
                        >
                          İptal
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={handleSaveProfile}
                          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                          disabled={loading}
                        >
                          Kaydet
                        </Button>
                      </Box>
                    ) : (
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => setEditMode(true)}
                        startIcon={<EditIcon />}
                      >
                        Düzenle
                      </Button>
                    )}
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ad Soyad"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editMode || loading}
                        variant={editMode ? "outlined" : "filled"}
                        InputProps={{ readOnly: !editMode }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="E-posta"
                        value={currentUser?.email}
                        disabled
                        variant="filled"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Telefon"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editMode || loading}
                        variant={editMode ? "outlined" : "filled"}
                        InputProps={{ readOnly: !editMode }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Üyelik Tarihi"
                        value={userProfile?.createdAt ? format(userProfile.createdAt.toDate(), 'dd MMMM yyyy', { locale: tr }) : ''}
                        disabled
                        variant="filled"
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {/* Aktivite Geçmişi */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Aktivite Geçmişi
                  </Typography>
                  
                  {activityLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                      <CircularProgress />
                    </Box>
                  ) : activityHistory.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        Henüz hiç aktivite bulunmuyor.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }}
                        href="/questions"
                      >
                        Sorulara Git
                      </Button>
                    </Box>
                  ) : (
                    <List>
                      {activityHistory.map((activity) => (
                        <React.Fragment key={activity.id}>
                          <ListItem 
                            alignItems="flex-start"
                            sx={{ px: 0 }}
                            component={activity.questionId ? "a" : "div"}
                            href={activity.questionId ? `/questions/${activity.questionId}` : undefined}
                          >
                            <ListItemIcon>
                              <Avatar 
                                sx={{ 
                                  bgcolor: activity.correct ? 'success.light' : 'error.light',
                                  width: 40,
                                  height: 40
                                }}
                              >
                                {activity.correct ? <CheckIcon /> : <CloseIcon />}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="subtitle1" component="span">
                                    {activity.questionTitle}
                                  </Typography>
                                  <Chip 
                                    size="small" 
                                    label={activity.category} 
                                    color="primary" 
                                    variant="outlined" 
                                    sx={{ ml: 1 }}
                                  />
                                </Box>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  component="span"
                                >
                                  {format(activity.date, 'dd MMMM yyyy HH:mm', { locale: tr })}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  )}
                </Box>
              )}
              
              {/* Performans */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Performans Analizi
                  </Typography>
                  
                  {activityHistory.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        Performans analizi için yeterli veri bulunmuyor. Daha fazla soru çözmeyi deneyin.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }}
                        href="/questions"
                      >
                        Sorulara Git
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {/* Başarı oranı */}
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Genel Başarı Oranı
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                                <CircularProgress 
                                  variant="determinate" 
                                  value={activityHistory.length > 0 ? Math.round((activityHistory.filter(a => a.correct).length / activityHistory.length) * 100) : 0} 
                                  size={80}
                                  thickness={5}
                                  color="success"
                                />
                                <Box
                                  sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="h6" component="div" color="text.secondary">
                                    {activityHistory.length > 0 ? Math.round((activityHistory.filter(a => a.correct).length / activityHistory.length) * 100) : 0}%
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Typography variant="body1">
                                  Toplam: {activityHistory.length} soru
                                </Typography>
                                <Typography variant="body2" color="success.main">
                                  Doğru: {activityHistory.filter(a => a.correct).length}
                                </Typography>
                                <Typography variant="body2" color="error.main">
                                  Yanlış: {activityHistory.filter(a => !a.correct).length}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      {/* Kategori başarısı */}
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Kategori Bazında Başarı
                            </Typography>
                            <List dense>
                              {[...new Set(activityHistory.map(a => a.category))].map((category) => {
                                const categoryActivities = activityHistory.filter(a => a.category === category);
                                const correctCount = categoryActivities.filter(a => a.correct).length;
                                const successRate = Math.round((correctCount / categoryActivities.length) * 100);
                                
                                return (
                                  <ListItem key={category}>
                                    <ListItemText 
                                      primary={category} 
                                      secondary={`${correctCount}/${categoryActivities.length} (${successRate}%)`} 
                                    />
                                    <Box sx={{ width: '50%', mr: 1 }}>
                                      <LinearProgress 
                                        variant="determinate" 
                                        value={successRate} 
                                        color={successRate >= 70 ? "success" : successRate >= 40 ? "warning" : "error"} 
                                        sx={{ height: 8, borderRadius: 5 }}
                                      />
                                    </Box>
                                  </ListItem>
                                );
                              })}
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              )}
            </Paper>
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

// Performans sayfasındaki linear progress için
const LinearProgress = ({ value, color, ...props }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <Box
          sx={{
            height: props.sx?.height || 4,
            borderRadius: props.sx?.borderRadius || 5,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: `${value}%`,
              height: '100%',
              bgcolor: color === 'success' ? 'success.main' : color === 'warning' ? 'warning.main' : 'error.main',
              position: 'absolute',
              transition: 'width 0.5s ease'
            }}
          />
        </Box>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{value}%</Typography>
      </Box>
    </Box>
  );
};

export default ProfilePage; 