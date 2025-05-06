import AlertBox from '@/components/Alert';
import loginAPI from '@/services/auth/loginAPI';
import { useAuth } from '@/store/contexts/AuthProvider';

import { TextField, Button, Checkbox, FormControlLabel, Link, Typography, Box } from '@mui/material';

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const { setAccessToken, setIsUser } = useAuth();
    const handleAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password } = form;

        try {
            await loginAPI({ email, password })
                .then((res) => {
                    if (res.status === 200) {
                        handleAlert('Đăng nhập thành công', 'success');
                        setForm({
                            email: '',
                            password: '',
                            remember: false,
                        });
                        setAccessToken(res.data.accessToken);
                        setIsUser(res.data.user.isUser ? 'true' : 'false');
                        window.location.href = '/'; // Redirect to login page
                    } else {
                        handleAlert(res.data.message, 'error');
                    }
                }
                )
                .catch((err) => {
                    handleAlert(err.message, 'error');
                }
                );
        } catch (error) {
            console.error('Error:', error);
            handleAlert('Đã xảy ra lỗi!!!', 'error');
        }
    };

    return (
        <>
            <AlertBox setOpen={setOpen} open={open} severity={severity} message={message} />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" padding={2}>
                <Typography variant="h4" gutterBottom>Đăng nhập</Typography>
                <Box component="form" onSubmit={handleLogin} noValidate autoComplete="off" width="100%" maxWidth={400}>
                    <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" variant="outlined" />
                    <TextField fullWidth label="Mật khẩu" type="password" name="password" value={form.password} onChange={handleChange} margin="normal" variant="outlined" />
                    <FormControlLabel control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} />} label="Nhớ mật khẩu" />
                    <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }} type="submit">Đăng nhập</Button>
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Link href="#" variant="body2">Quên mật khẩu?</Link>
                        <Link href="/signup" variant="body2">Tạo tài khoản ngay</Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
