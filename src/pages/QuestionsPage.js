import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

const QuestionsPage = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [subjects, setSubjects] = useState([]);

  // Kategori başlıklarını tanımlayalım
  const categoryTitles = {
    tyt: 'TYT - Temel Yeterlilik Testi',
    ayt: 'AYT - Alan Yeterlilik Testi',
    lgs: 'LGS - Liseye Geçiş Sınavı',
    kpss: 'KPSS - Kamu Personeli Seçme Sınavı',
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        let q;
        
        if (categoryId) {
          q = query(
            collection(db, "questions"),
            where("category", "==", categoryId),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(
            collection(db, "questions"),
            orderBy("createdAt", "desc")
          );
        }
        
        const querySnapshot = await getDocs(q);
        const fetchedQuestions = [];
        const subjectSet = new Set();
        
        querySnapshot.forEach((doc) => {
          const question = {
            id: doc.id,
            ...doc.data()
          };
          fetchedQuestions.push(question);
          
          // Konuları toplama
          if (question.subject) {
            subjectSet.add(question.subject);
          }
        });
        
        setQuestions(fetchedQuestions);
        setFilteredQuestions(fetchedQuestions);
        setSubjects(Array.from(subjectSet));
      } catch (error) {
        console.error("Sorular yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [categoryId]);

  useEffect(() => {
    // Filtreleme ve sıralama işlemleri
    let result = [...questions];
    
    // Konu filtreleme
    if (selectedSubject !== 'all') {
      result = result.filter(q => q.subject === selectedSubject);
    }
    
    // Arama filtreleme
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(q => 
        q.content?.toLowerCase().includes(lowerSearchTerm) || 
        q.title?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sıralama
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'oldest':
        result.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'az':
        result.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title?.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredQuestions(result);
  }, [questions, searchTerm, sortOption, selectedSubject]);

  // Arama terimini değiştirme
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sıralama seçeneğini değiştirme
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Konu filtresini değiştirme
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // İçerik uzunsa kısaltma
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // HTML'i temizleme
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
          >
            {categoryId ? categoryTitles[categoryId] || 'Sorular' : 'Tüm Sorular'}
          </Typography>
          
          {categoryId && (
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              paragraph
            >
              Bu bölümde {categoryTitles[categoryId]?.split(' - ')[1] || ''} sorularını bulabilirsiniz.
            </Typography>
          )}
        </Box>
        
        {/* Filtreleme ve arama araçları */}
        <Box 
          sx={{ 
            mb: 4, 
            p: 2, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Soru içeriğinde ara..."
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
            
            <Grid item xs={12} sm={6} md={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Konu</InputLabel>
                <Select
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  label="Konu"
                >
                  <MenuItem value="all">Tüm Konular</MenuItem>
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Sırala</InputLabel>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  label="Sırala"
                >
                  <MenuItem value="newest">En Yeniler</MenuItem>
                  <MenuItem value="oldest">En Eskiler</MenuItem>
                  <MenuItem value="az">A-Z</MenuItem>
                  <MenuItem value="za">Z-A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        {/* Sonuç bilgisi */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredQuestions.length} sonuç bulundu
          </Typography>
          
          {selectedSubject !== 'all' && (
            <Chip 
              label={`Konu: ${selectedSubject}`}
              onDelete={() => setSelectedSubject('all')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredQuestions.length === 0 ? (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8, 
                  bgcolor: 'background.paper',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Hiç sonuç bulunamadı
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Filtreleri değiştirmeyi veya farklı bir arama terimi kullanmayı deneyin
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredQuestions.map((question) => (
                  <Grid item xs={12} key={question.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card 
                        sx={{ 
                          height: '100%',
                          transition: '0.3s',
                          '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Typography 
                            variant="h6" 
                            component="div" 
                            gutterBottom
                            fontWeight="medium"
                          >
                            {question.title || 'Başlıksız Soru'}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            {question.subject && (
                              <Chip 
                                label={question.subject} 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
                            )}
                            {question.difficulty && (
                              <Chip 
                                label={question.difficulty === 'easy' ? 'Kolay' : 
                                       question.difficulty === 'medium' ? 'Orta' : 'Zor'} 
                                size="small" 
                                color={question.difficulty === 'easy' ? 'success' : 
                                       question.difficulty === 'medium' ? 'warning' : 'error'} 
                                variant="outlined"
                              />
                            )}
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            paragraph
                            dangerouslySetInnerHTML={{ 
                              __html: truncateText(question.content, 200) 
                            }}
                          />
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              {question.createdAt?.toDate().toLocaleDateString('tr-TR')}
                            </Typography>
                            
                            <Button 
                              variant="outlined" 
                              size="small" 
                              href={`/questions/${question.id}`}
                            >
                              Soruyu Gör
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default QuestionsPage; 