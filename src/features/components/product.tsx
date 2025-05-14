import { ProductType } from "@/types/product/productType";
import { API_URL } from "@/utils/api";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, SetStateAction, useState } from "react";
import { CartItem } from "@/types/cart/cart";

interface ProductProps {
    product: ProductType;
    quantity: number;
    setCart: Dispatch<SetStateAction<CartItem>>;
}

export default function Product({ product, quantity, setCart }: ProductProps) {

    const handleChangeQuantity = (delta: number) => {
        setCart((prevCart) => {
            const updatedProducts = prevCart.products
                .map((item) => {
                    if (item.product.id === product.id) {
                        const newQuantity = Math.max(item.quantity + delta, 0);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);

            const updatedTotalPrice = updatedProducts.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            );
            localStorage.setItem("cart", JSON.stringify(
                updatedProducts
                    .filter((item) => item.quantity > 0)
                    .map((item) => ({
                        id: item.product.id.toString(),
                        quantity: item.quantity,
                    }))
            ));

            return {
                ...prevCart,
                products: updatedProducts,
                totalPrice: updatedTotalPrice,
            };
        }
        );
    };


    return (
        <Card
            sx={{
                margin: "0 auto",
                marginTop: 5,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                backgroundColor: "#f5f5f5",
            }}
            className="max-w-3xl mt-10"
        >
            {/* Product Image */}
            <CardMedia
                component="img"
                image={API_URL + product.image}
                alt={product.name}
                sx={{
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                    width: { xs: 200, sm: 250, md: 300 },
                    height: { xs: 160, sm: 180, md: 200 },
                    textAlign: "center",
                    justifyContent: "center",
                }}
            />

            {/* Product Info */}
            <CardContent
                sx={{
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography variant="subtitle1" gutterBottom>
                    {product.name.length > 150
                        ? product.name.substring(0, 150) + "..."
                        : product.name}
                </Typography>


                {/* Quantity Control */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>

                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                            size="small"
                            onClick={() => handleChangeQuantity(-1)}
                            disabled={quantity <= 0}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography>{quantity}</Typography>
                        <IconButton size="small" onClick={() => handleChangeQuantity(1)}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Typography >
                        Đơn giá: {product.price.toLocaleString()}₫
                    </Typography>
                </Box>

                {/* Total */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography color="primary" fontWeight="bold">
                        Thành tiền: {(product.price * quantity).toLocaleString()}₫
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
