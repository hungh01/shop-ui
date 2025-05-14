import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReplayIcon from '@mui/icons-material/Replay';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const services = [
    {
        title: 'Tailoring Service',
        description: 'We offer on-demand tailoring for a perfect fit.',
        icon: <DesignServicesIcon fontSize="large" color="primary" />,
    },
    {
        title: 'Home Delivery',
        description: 'Fast, secure shipping to your doorstep.',
        icon: <LocalShippingIcon fontSize="large" color="primary" />,
    },
    {
        title: 'Style Consultation',
        description: 'Get fashion advice from our experts.',
        icon: <SupportAgentIcon fontSize="large" color="primary" />,
    },
    {
        title: 'Easy Returns',
        description: '14-day hassle-free returns on all items.',
        icon: <ReplayIcon fontSize="large" color="primary" />,
    },
    {
        title: 'Membership Rewards',
        description: 'Earn points and unlock exclusive deals.',
        icon: <LoyaltyIcon fontSize="large" color="primary" />,
    },
];

export default function Services() {
    return (
        <Container maxWidth="lg" sx={{ py: 8, paddingTop: 10 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                Our Services
            </Typography>
            <Grid container spacing={4}>
                {services.map((service, index) => (
                    <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            elevation={3}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 3,
                            }}
                        >
                            <Box mb={2}>{service.icon}</Box>
                            <CardContent>
                                <Typography variant="h6" gutterBottom fontWeight="medium">
                                    {service.title}
                                </Typography>
                                <Typography color="text.secondary">
                                    {service.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
