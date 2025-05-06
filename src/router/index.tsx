// router.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import Services from '@/pages/Services';
import Login from '@/features/auth/login/page';
import Signup from '@/features/auth/signup/page';
import Dashboard from '@/pages/Dasdboard';
import { IsLogin, ProtectedAdminRoute } from '@/store/contexts/ProtectedRoute';
import Logout from '@/features/auth/logout';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Services />} />

                {/* auth */}
                <Route path="login" element={<IsLogin><Login /></IsLogin>} />
                <Route path="signup" element={<Signup />} />
                <Route path="logout" element={<Logout />} />
                {/*dashboard*/}
                <Route path="dashboard" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
                <Route path="/not-found" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
