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
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
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
            Gizlilik Politikası
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Bil Bakalım olarak kişisel verilerinizin güvenliğini önemsiyoruz. Bu gizlilik politikası, hangi bilgileri topladığımızı ve bunları nasıl kullandığımızı açıklamaktadır.
          </Typography>
        </motion.div>
      </Box>

      <motion.div {...fadeIn}>
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            1. Topladığımız Bilgiler
          </Typography>
          <Typography variant="body1" paragraph>
            Bil Bakalım platformunu kullanırken aşağıdaki bilgileri toplayabiliriz:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Kişisel Bilgiler" 
                secondary="Ad, soyad, e-posta adresi, telefon numarası gibi hesap oluşturma sırasında verdiğiniz bilgiler."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Kullanım Verileri" 
                secondary="Platform üzerindeki etkinlikleriniz, çözdüğünüz sorular, yanıtlarınız ve performans istatistikleriniz."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Teknik Veriler" 
                secondary="IP adresi, tarayıcı türü, cihaz bilgileri ve platformu nasıl kullandığınıza dair diğer teknik veriler."
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            2. Bilgileri Kullanma Amacımız
          </Typography>
          <Typography variant="body1" paragraph>
            Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Platformu sizin için özelleştirmek ve kişiselleştirilmiş içerik sunmak" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Hesabınızı oluşturmak ve yönetmek" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Platformdaki performansınızı analiz etmek ve size özel öneriler sunmak" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Platform hizmetlerini ve içeriklerini geliştirmek" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Sizinle iletişim kurmak (destek sağlamak, güncellemeler hakkında bilgilendirmek vb.)" />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            3. Bilgilerin Paylaşılması
          </Typography>
          <Typography variant="body1" paragraph>
            Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:
          </Typography>
          <Typography variant="body1" paragraph>
            3.1 Hizmet sağlayıcılarımız: Platformumuzu işletmek ve size hizmet sunmak için kullandığımız hizmet sağlayıcılar (sunucu barındırma, ödeme işleme, analiz hizmetleri vb.).
          </Typography>
          <Typography variant="body1" paragraph>
            3.2 Yasal gereklilikler: Yasal bir yükümlülük, mahkeme kararı veya resmi bir talep doğrultusunda bilgilerinizi paylaşmamız gerektiğinde.
          </Typography>
          <Typography variant="body1" paragraph>
            3.3 Şirket işlemleri: Bir birleşme, satın alma veya varlık satışı durumunda, bilgileriniz aktarılan varlıklar arasında olabilir.
          </Typography>
          <Typography variant="body1" paragraph>
            3.4 İzninizle: Açık izninizi aldığımız diğer durumlarda.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            4. Veri Güvenliği
          </Typography>
          <Typography variant="body1" paragraph>
            Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz. Bu önlemler şunları içerir:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="SSL şifreleme teknolojisi kullanımı" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="Düzenli güvenlik değerlendirmeleri ve testleri" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="Veri erişimlerinin sınırlandırılması ve izlenmesi" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="Güncel güvenlik yazılımları ve sistemleri" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            Ancak hiçbir internet tabanlı platform %100 güvenli değildir. Bu nedenle, verilerinizin mutlak güvenliğini garanti edemeyiz.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            5. Çerezler ve Takip Teknolojileri
          </Typography>
          <Typography variant="body1" paragraph>
            Platformumuzda kullanıcı deneyimini geliştirmek için çerezler ve benzer takip teknolojileri kullanıyoruz. Bu teknolojiler, platformu nasıl kullandığınız hakkında bilgi toplar ve tercihlerinizi hatırlamamıza yardımcı olur.
          </Typography>
          <Typography variant="body1" paragraph>
            Çoğu web tarayıcısı, çerezleri engelleme veya çerezler hakkında sizi uyarma seçeneği sunar. Ancak, çerezleri engellerseniz platformun bazı özellikleri düzgün çalışmayabilir.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            6. Kullanıcı Hakları
          </Typography>
          <Typography variant="body1" paragraph>
            Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Bilgi Erişimi: Hakkınızda hangi bilgileri topladığımızı öğrenme hakkı" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Düzeltme: Yanlış veya eksik bilgilerinizi düzeltme hakkı" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Silme: Belirli koşullar altında verilerinizin silinmesini talep etme hakkı" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="İşlemeyi Kısıtlama: Belirli koşullar altında veri işlememizi kısıtlama hakkı" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Veri Taşınabilirliği: Verilerinizi yapılandırılmış, makine tarafından okunabilir bir formatta alma hakkı" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            Bu haklarınızı kullanmak için bizimle <Box component="span" sx={{ fontWeight: 'bold' }}>privacy@bilbakalim.com</Box> adresinden iletişime geçebilirsiniz.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
            7. Değişiklikler ve İletişim
          </Typography>
          <Typography variant="body1" paragraph>
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda, bu değişiklikler hakkında sizi bilgilendireceğiz.
          </Typography>
          <Typography variant="body1" paragraph>
            Gizlilik politikamız veya kişisel verilerinizin işlenmesiyle ilgili sorularınız için <Box component="span" sx={{ fontWeight: 'bold' }}>privacy@bilbakalim.com</Box> adresinden bizimle iletişime geçebilirsiniz.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Son güncelleme: 1 Haziran 2023
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default PrivacyPage; 