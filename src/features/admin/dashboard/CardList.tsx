import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useEffect, useState } from 'react';
import { API_URL } from '@/utils/api';

interface InventoryStats {
    totalInventoryValue: number;
    totalStockCount: number;
}

export default function CardList() {
    const [stats, setStats] = useState<InventoryStats>({
        totalInventoryValue: 0,
        totalStockCount: 0,
    });
    useEffect(() => {
        const fetchInventoryStats = async () => {
            try {
                const response = await fetch(`${API_URL}/products/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data: InventoryStats = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching inventory stats:', error);
            }
        };

        fetchInventoryStats();
    }, []);

    const cards = [
        {
            title: 'Tổng giá trị hàng tồn',
            value: stats.totalInventoryValue.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }),
            icon: <MonetizationOnOutlinedIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Tổng số lượng hàng tồn',
            value: stats.totalStockCount,
            icon: <Inventory2OutlinedIcon fontSize="large" color="success" />,
        },
    ];

    return (
        <Grid container spacing={3} textAlign={'center'} sx={{ marginTop: 2 }}>
            {cards.map((card, index) => (
                <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#F2F2F2' }}>
                        <Box sx={{ mr: 2 }}>{card.icon}</Box>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">
                                {card.title}
                            </Typography>
                            <Typography variant="h6">{card.value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
