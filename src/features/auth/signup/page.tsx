import { TextField, Button, Link, Typography, Box } from '@mui/material';
import { useState } from 'react';

import AlertBox from '@/components/notification/Alert';
import signupAPI from '@/services/auth/signupAPI';
import validateEmail from '@/utils/validate/validateEmail';

export default function Signup() {


    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const handleAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };


    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.city || !form.district || !form.ward || !form.address || !form.email || !form.password || !form.confirmPassword) {
            handleAlert('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }
        // Kiểm tra định dạng email
        if (!validateEmail(form.email)) {
            handleAlert('Email không hợp lệ', 'error');
            return;
        }

        // so sanh mật khẩu
        if (form.password !== form.confirmPassword) {
            handleAlert('Mật khẩu không khớp', 'error');
            return;
        }

        // goi API Dang ky tai khoan

        try {
            await signupAPI(form)
                .then((res) => {
                    if (res.status === 201) {
                        handleAlert('Đăng ký thành công', 'success');
                        setForm({
                            name: '',
                            phone: '',
                            city: '',
                            district: '',
                            ward: '',
                            address: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        });
                        setTimeout(() => {
                            window.location.href = '/login'; // Redirect to login page
                        }, 2000);
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
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={2}>
                <Typography variant="h4" gutterBottom>Đăng ký tài khoản</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" width="100%" maxWidth={400}>
                    <TextField fullWidth label="Họ và tên" name="name" value={form.name} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Tỉnh, thành phố" name="city" value={form.city} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Quận, huyện" name="district" value={form.district} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Phường, xã" name="ward" value={form.ward} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Địa chỉ cụ thể" name="address" value={form.address} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Email" type="email" name="email" value={form.email} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Mật khẩu" type="password" name="password" value={form.password} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Xác nhận mật khẩu" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} margin="normal" />
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">Đăng ký</Button>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Link href="/login" variant="body2">Đã có tài khoản?</Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}