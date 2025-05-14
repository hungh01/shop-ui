import { ProductType } from "@/types/product/productType";
import { API_URL } from "@/utils/api";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

export default function Product(product: ProductType) {
    return (
        <Card
            sx={{
                width: {
                    xs: '100%',    // màn hình nhỏ (mobile)
                    sm: 250,       // tablet
                    md: '100',     // desktop
                },
                position: "relative",
                borderRadius: 2,
            }}
            component="a"
            href={product.stock === 0 ? undefined : `/products/${product.id}`}
        >
            {/* Wrapper cho phần hình ảnh và overlay */}
            <Box position="relative">
                {/* Product Image */}
                <CardMedia
                    component="img"
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
                        filter: product.stock <= 0 ? "grayscale(100%) brightness(0.8)" : "none",
                    }}
                />

                {/* Overlay image when out of stock */}
                {product.stock <= 0 && (
                    <Box
                        component="img"
                        src="https://shipquocte.com/uploads/files/tin-tuc/95-in-stock%20out-stock%20l%C3%A0%20g%C3%AC.jpg"
                        alt="Out of stock overlay"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.7,
                            filter: "blur(1px)", // Tùy chỉnh mức độ mờ
                            zIndex: 2,
                        }}
                    />
                )}
            </Box>
            {/* Product Details */}
            <CardContent sx={{ width: "fixed", height: "fixed", backgroundColor: "#f5f5f5", }}>
                <Typography variant="subtitle1" component="div" gutterBottom>
                    {product.name.length > 22 ? product.name.substring(0, 22) + "..." : product.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
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
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    Tồn kho: {product.stock}
                </Typography>
            </CardContent>
        </Card>
    );
}

