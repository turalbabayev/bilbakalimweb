import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { SentimentDissatisfied as SentimentDissatisfiedIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            textAlign: 'center', 
            p: 6, 
            borderRadius: 4,
            bgcolor: 'background.default'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: 'spring',
                stiffness: 200
              }}
            >
              <SentimentDissatisfiedIcon 
                sx={{ 
                  fontSize: 120, 
                  color: 'primary.main',
                  mb: 2
                }} 
              />
            </motion.div>
            
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              404
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              color="text.secondary"
              fontWeight="medium"
            >
              Sayfa Bulunamadı
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              paragraph
              sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}
            >
              Aradığınız sayfa bulunamadı. Sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak erişilemiyor olabilir.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/"
                sx={{ px: 4, py: 1.2 }}
              >
                Ana Sayfaya Dön
              </Button>
              
              <Button 
                variant="outlined" 
                size="large" 
                component={RouterLink} 
                to="/questions"
                sx={{ px: 4, py: 1.2 }}
              >
                Sorulara Git
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage; 