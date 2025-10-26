import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >
                <ErrorOutlineIcon
                    sx={{
                        fontSize: 120,
                        color: 'error.main',
                        mb: 2,
                    }}
                />
                <Typography variant='h1' component='h1' gutterBottom>
                    404
                </Typography>
                <Typography variant='h5' component='h2' gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    The page you are looking for does not exist or has been moved.
                </Typography>
                <Button variant="contained" size="large" onClick={handleGoHome}>
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
}