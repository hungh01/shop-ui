// router.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import Services from '@/pages/Services';
import Login from '@/features/auth/login/page';
import Signup from '@/features/auth/signup/page';

import { IsLogin, ProtectedAdminRoute, ProtectedRoute } from '@/store/contexts/ProtectedRoute';
import Logout from '@/features/auth/logout';
import ProductsByCategory from '@/features/products/components/ProductsByCategory';
import ProductDetail from '@/features/products/components/ProductDetail';
import Cart from '@/features/cart/Cart';
import Orders from '@/features/order/orders';
import OrdersManagement from '@/features/admin/orders/orders';
import Management from '@/features/admin/product-management/Management';
import AddProduct from '@/features/admin/product-management/AddProduct';
import UpdateProduct from '@/features/admin/product-management/UpdateProduct';
import DashboardLayoutBranding from '@/features/admin/dashboard/Layout';
import Dashboard from '@/features/admin/dashboard/DashBoard';
import Contact from '@/pages/Contact';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="category/:categoryId" element={<ProductsByCategory />} />
                <Route path="products/:productId" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

                {/* auth */}
                <Route path="login" element={<IsLogin><Login /></IsLogin>} />
                <Route path="signup" element={<Signup />} />
                <Route path="logout" element={<Logout />} />
                {/*dashboard*/}
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
                <Route path="/not-found" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<ProtectedAdminRoute><DashboardLayoutBranding /></ProtectedAdminRoute>}>
                <Route path="orders" element={<OrdersManagement />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="management" element={<Management />} />
                <Route path="addproduct" element={<AddProduct />} />
                <Route path="updateproduct/:id" element={<UpdateProduct />} />
            </Route>
        </Routes>
    );
}
