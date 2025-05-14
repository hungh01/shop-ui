// src/components/charts/SalesChart.tsx

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

type SalesChartProps = {
    data: { name: string; sales: number }[],
    setType: (type: string) => void
};

export default function SalesChart({ data, setType }: SalesChartProps) {
    return (
        <Paper sx={{ padding: 2, marginTop: 4 }}>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Tổng hợp doanh thu
                </Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        Chọn loại biểu đồ:
                    </Typography>
                    <select
                        onChange={(e) => setType(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    >
                        <option value="daily">Hàng ngày</option>
                        <option value="weekly">Hàng tuần</option>
                        <option value="monthly">Hàng tháng</option>
                    </select>
                </Box>
                <Box sx={{ width: '100%', height: 300, }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value.toLocaleString()} vnđ`} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} vnđ`} />
                            <Line type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Paper>
    );
}
