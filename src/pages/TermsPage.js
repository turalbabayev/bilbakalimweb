import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Gavel as GavelIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const TermsPage = () => {
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
            Kullanım Koşulları
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Lütfen Bil Bakalım platformunu kullanmadan önce aşağıdaki koşulları dikkatlice okuyunuz.
          </Typography>
        </motion.div>
      </Box>

      <motion.div {...fadeIn}>
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            1. Genel Hükümler
          </Typography>
          <Typography variant="body1" paragraph>
            1.1 Bu web sitesini kullanarak, bu kullanım koşullarını kabul etmiş sayılırsınız.
          </Typography>
          <Typography variant="body1" paragraph>
            1.2 Bil Bakalım, herhangi bir zamanda bu koşulları değiştirme hakkını saklı tutar. Değişiklikler, web sitesinde yayınlandığı andan itibaren geçerli olacaktır.
          </Typography>
          <Typography variant="body1" paragraph>
            1.3 Bu platformu kullanabilmek için en az 13 yaşında olmanız gerekmektedir.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            2. Hesap Oluşturma ve Güvenlik
          </Typography>
          <Typography variant="body1" paragraph>
            2.1 Platformumuzda hesap oluşturduğunuzda, doğru, eksiksiz ve güncel bilgiler vermeyi kabul edersiniz.
          </Typography>
          <Typography variant="body1" paragraph>
            2.2 Hesabınızın güvenliğini sağlamak sizin sorumluluğunuzdadır. Şifrenizin gizliliğini korumalı ve hesabınızla ilgili herhangi bir şüpheli aktiviteyi bize bildirmelisiniz.
          </Typography>
          <Typography variant="body1" paragraph>
            2.3 Hesabınızdaki tüm etkinliklerden siz sorumlusunuz.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            3. İçerik ve Telif Hakları
          </Typography>
          <Typography variant="body1" paragraph>
            3.1 Bil Bakalım platformundaki tüm içerikler (sorular, görsel materyaller, metinler vb.) telif hakkı kanunları tarafından korunmaktadır.
          </Typography>
          <Typography variant="body1" paragraph>
            3.2 Platformdaki içerikleri izinsiz kopyalamak, dağıtmak, yayınlamak veya ticari amaçlarla kullanmak yasaktır.
          </Typography>
          <Typography variant="body1" paragraph>
            3.3 Kullanıcılar, platforma kendi yükledikleri içeriklerden tamamen sorumludur ve bu içeriklerin başkalarının haklarını ihlal etmediğini garanti ederler.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            4. Yasaklı Davranışlar
          </Typography>
          <Typography variant="body1" paragraph>
            Aşağıdaki davranışlar kesinlikle yasaktır:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Platform güvenliğini tehlikeye atacak herhangi bir eylemde bulunmak" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Diğer kullanıcılara zarar verecek içerik paylaşmak" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Kişisel verileri izinsiz toplamak veya paylaşmak" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Platformu kötü amaçlarla kullanmak" />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            5. Sorumluluk Reddi
          </Typography>
          <Typography variant="body1" paragraph>
            5.1 Bil Bakalım, platformda sunulan içeriklerin doğruluğu, güncelliği veya eksiksizliği konusunda herhangi bir garanti vermez.
          </Typography>
          <Typography variant="body1" paragraph>
            5.2 Platform, önceden bildirimde bulunmaksızın herhangi bir zamanda hizmetlerini değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
          </Typography>
          <Typography variant="body1" paragraph>
            5.3 Bil Bakalım, platformun kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            6. İletişim
          </Typography>
          <Typography variant="body1" paragraph>
            Bu kullanım koşulları ile ilgili herhangi bir sorunuz varsa, lütfen <Box component="span" sx={{ fontWeight: 'bold' }}>info@bilbakalim.com</Box> adresinden bize ulaşın.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Son güncelleme: 1 Haziran 2023
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default TermsPage; 