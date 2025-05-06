import { ProductType } from "@/types/product/productType";
import { API_URL } from "@/utils/api";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";

export default function Product(product: ProductType) {
    return (
        <Card sx={{
            width: {
                xs: '100%',    // màn hình nhỏ (mobile)
                sm: 250,       // tablet
                md: '100',       // desktop
            }, position: "relative", borderRadius: 2
        }}>
            {/* Product Image */}
            <CardMedia
                component="img"
                width="100%"
                image={API_URL + product.image}
                alt={product.name}
                sx={{
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                    width: {
                        xs: 200,
                        sm: 250,
                        md: 300,
                    },
                    height: {
                        xs: 160,
                        sm: 180,
                        md: 200,
                    },
                }}
            />

            {/* Product Details */}
            <CardContent sx={{ width: "auto", height: "auto" }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {product.price.toLocaleString()}₫
                    </Typography>
                    {product.price && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                        >
                            {product.price.toLocaleString()}₫
                        </Typography>
                    )}
                </Box>
            </CardContent>

            {/* Action Button */}
            <Box display="flex" justifyContent="center" p={2}>
                <Button variant="outlined" color="primary">
                    Thêm vào giỏ hàng
                </Button>
            </Box>
        </Card>
    );
}