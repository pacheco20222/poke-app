import { Box, Container, Paper, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Card with shadow */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Lock icon in circle */}
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Page title */}
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign In to Pokédex
          </Typography>

          {/* Login form */}
          <LoginForm />
        </Paper>

        {/* Footer text */}
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Pokédex App - Sunwise Frontend Challenge
        </Typography>
      </Box>
    </Container>
  );
}