
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Circular() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
        </Box>
    );
}