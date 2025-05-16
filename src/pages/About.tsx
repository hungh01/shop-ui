
import { Container, Grid, Typography, Button, Divider } from '@mui/material';

export default function About() {
    return (
        <Container maxWidth="lg" sx={{ py: 8, paddingTop: 10 }}>
            <Grid container spacing={6} alignItems="center">
                {/* Image Section */}


                {/* Text Section */}
                <Grid sx={{ xs: 12, md: 6 }} >
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Christian Shop
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Christian Shop là địa chỉ mua sắm thời trang đáng tin cậy, nơi bạn có thể tìm thấy những thiết kế hiện đại, trẻ trung và phù hợp với mọi phong cách. Với sứ mệnh mang đến sự tự tin và nổi bật cho từng khách hàng, chúng tôi không ngừng cập nhật những xu hướng mới nhất trong và ngoài nước.

                        Tại Christian, mỗi sản phẩm đều được chọn lọc kỹ lưỡng từ chất liệu đến kiểu dáng, đảm bảo sự thoải mái và độ bền cao khi sử dụng. Từ trang phục hằng ngày, đồ công sở, đến các mẫu đầm dạ hội, áo khoác, phụ kiện – chúng tôi đều có đầy đủ để bạn tự tin thể hiện phong cách cá nhân.
                        💡 Tại sao nên chọn Christian Shop?

                    </Typography>
                    <Button variant="contained" size="large" color="primary" onClick={() => window.location.href = "/"}>
                        Khám phá ngay các sản phẩm của chúng tôi.
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ my: 6 }} />

            {/* Values Section */}
            <Typography variant="h5" fontWeight="medium" gutterBottom>
                Giá trị cốt lõi của chúng tôi
            </Typography>
            <Grid container spacing={4}>
                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        👚 Sản phẩm chất lượng
                    </Typography>
                    <Typography color="text.secondary">
                        Vải đẹp, đường may tinh tế, kiểu dáng đa dạng.
                    </Typography>
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        🛍️ Giá cả hợp lý
                    </Typography>
                    <Typography color="text.secondary">
                        Luôn có nhiều ưu đãi hấp dẫn và chương trình giảm giá định kỳ.
                    </Typography>
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        🚚 Giao hàng toàn quốc
                    </Typography>
                    <Typography color="text.secondary">
                        Nhanh chóng, an toàn và tiện lợi.
                    </Typography>
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        ❤️ Hỗ trợ tận tình
                    </Typography>
                    <Typography color="text.secondary">
                        Đội ngũ chăm sóc khách hàng sẵn sàng đồng hành cùng bạn trước và sau khi mua hàng.
                    </Typography>
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography color="text.secondary">
                        Hãy để Christian Shop đồng hành cùng bạn trên hành trình khẳng định phong cách cá nhân – bởi vì mỗi người đều xứng đáng được đẹp theo cách riêng của mình.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
