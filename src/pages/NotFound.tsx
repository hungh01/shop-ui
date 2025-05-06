
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="h1" component="div" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" mb={3}>
                The page you're looking for doesn't exist or has been moved.
            </Typography>
            <Button variant="contained" component={Link} to="/">
                Go Home
            </Button>
        </Box>
    );
}
