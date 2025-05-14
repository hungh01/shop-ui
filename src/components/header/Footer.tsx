import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    Stack,
    Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
    return (
        <Box component="footer" sx={{ backgroundColor: "#1E1E1E", color: "white", pt: 8, pb: 4, fontFamily: "Inter, sans-serif" }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={6}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "flex-start" }}
                >
                    {/* Logo & giới thiệu */}
                    <Box sx={{ flex: 1 }}>
                        <Box component="img" src="/logo.png" alt="Christian Shop" sx={{ height: 40, mb: 2 }} />
                        <Typography variant="body2" color="grey.400">
                            Nền tảng mua sắm trực tuyến với hàng ngàn sản phẩm chính hãng,
                            dịch vụ nhanh chóng và tận tâm.
                        </Typography>
                    </Box>

                    {/* Cột thông tin */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Thông tin
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="hover">Newsfeed</Link>
                            <Link href="#" color="inherit" underline="hover">Giới thiệu</Link>
                        </Stack>
                    </Box>

                    {/* Cột chính sách */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Chính sách
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="hover">Giao hàng</Link>
                            <Link href="#" color="inherit" underline="hover">Đổi trả</Link>
                            <Link href="#" color="inherit" underline="hover">Bảo hành</Link>
                        </Stack>
                    </Box>

                    {/* Cột liên hệ */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Hỗ trợ
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="hover">Tài khoản của tôi</Link>
                            <Link href="#" color="inherit" underline="hover">Đơn đặt hàng</Link>
                            <Link href="mailto:duyhung1632002@gmail.com" color="inherit" underline="hover">Email: duyhung1632002@gmail.com</Link>
                        </Stack>
                    </Box>
                </Stack>

                <Divider sx={{ bgcolor: "grey.700", my: 4 }} />

                {/* Bottom bar */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="caption" color="grey.500" align="center">
                        © {new Date().getFullYear()} Christian Shop. All rights reserved.
                        <br />
                        Dev: Duy Hùng | ĐT: 0858.547.574
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <IconButton href="https://facebook.com/nguyenduyhhung" target="_blank" sx={{ color: "white" }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="#" sx={{ color: "white" }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href="#" sx={{ color: "white" }}>
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
