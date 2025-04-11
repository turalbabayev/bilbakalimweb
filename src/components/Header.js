import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Link,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Avatar
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const menuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Sorular', path: '/questions' },
    { text: 'Hakkımızda', path: '/about' },
    { text: 'İletişim', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bil Bakalım
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {currentUser ? (
          <>
            <ListItem 
              button 
              component={RouterLink} 
              to="/profile"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Profilim" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Çıkış Yap" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              component={RouterLink} 
              to="/login"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Giriş Yap" />
            </ListItem>
            <ListItem 
              button 
              component={RouterLink} 
              to="/register"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Kayıt Ol" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ 
                flexGrow: 1, 
                color: 'white', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box component="img" 
                src="/logo.png" 
                alt="Bil Bakalım Logo" 
                sx={{ 
                  height: 40, 
                  mr: 1,
                  display: { xs: 'none', sm: 'block' }
                }} 
              />
              Bil Bakalım
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{ mx: 1 }}
                  >
                    {item.text}
                  </Button>
                ))}
                
                {currentUser ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/profile"
                      sx={{ mx: 1 }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          mr: 1,
                          bgcolor: theme.palette.secondary.main
                        }}
                      >
                        {userProfile?.name?.charAt(0) || currentUser.email?.charAt(0)}
                      </Avatar>
                      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {userProfile?.name || 'Kullanıcı'}
                      </Box>
                    </Button>
                    <Button 
                      color="inherit" 
                      onClick={handleLogout}
                      sx={{ ml: 1 }}
                    >
                      Çıkış Yap
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/login"
                      sx={{ mx: 1 }}
                    >
                      Giriş Yap
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      component={RouterLink} 
                      to="/register"
                      sx={{ ml: 1 }}
                    >
                      Kayıt Ol
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </motion.div>
  );
};

export default Header; 