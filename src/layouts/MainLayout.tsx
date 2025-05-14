import Footer from '@/components/header/Footer';
import Header from '@/components/header/Header';
import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh" // Đảm bảo layout chiếm đủ chiều cao màn hình
        >
            <Header />

            {/* Main content chiếm toàn bộ không gian còn lại */}
            <Box component="main" flex={1}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );

};
