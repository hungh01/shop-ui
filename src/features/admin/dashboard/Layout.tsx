
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddIcon from '@mui/icons-material/Add';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import { Outlet } from 'react-router-dom';


const NAVIGATION: Navigation = [
    {
        segment: 'admin/dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'admin/orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'admin/management',
        title: 'Product Management',
        icon: <Inventory2Icon />,
    },
    {
        segment: 'admin/addproduct',
        title: 'Add Product',
        icon: <AddIcon />,
    },
];




export default function DashboardLayoutBranding() {
    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                title: 'Christian Store',
                homeUrl: '/',
            }}
        >
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    );
}