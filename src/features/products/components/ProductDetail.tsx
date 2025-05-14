import DOMPurify from 'dompurify';
import AlertBox from "@/components/notification/Alert";
import Circular from "@/components/waiting/Circular";
import getProductDetail from "@/services/product/getProductDetail";
import { ProductType } from "@/types/product/productType";
import { API_URL } from "@/utils/api";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const handleAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const { productId } = useParams();
    const [product, setProduct] = useState<ProductType>();
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const result = await getProductDetail(productId as string);
                setProduct(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductDetail();
    }, [productId]);

    const handleAddToCart = () => {
        const cart = localStorage.getItem("cart");
        let cartItems = cart ? JSON.parse(cart) : [];
        const productIndex = cartItems.findIndex((item: { id: string }) => item.id === productId);
        if (productIndex !== -1) {
            cartItems[productIndex].quantity += 1;
        } else {
            cartItems.push({ id: productId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        handleAlert("Thêm vào giỏ hàng thành công", "success");
    };

    if (!product) {
        return <Circular />;
    }
    return (
        <>
            <AlertBox setOpen={setOpen} open={open} severity={severity} message={message} />
            <Box className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-20">
                {/* Image */}
                <Box className="w-full flex justify-center items-center">
                    <img
                        src={API_URL + product.image}
                        alt={product.name}
                        className="w-[500px] h-[500px] object-contain border border-gray-200 rounded-xl shadow-sm"
                    />
                </Box>

                {/* Info */}
                <Box className="space-y-4">
                    <Typography variant="h5" fontWeight="bold">{product.name}</Typography>

                    {/* <Rating value={product.rating} readOnly /> */}
                    <Typography variant="body1" color="text.secondary">
                        {product.stock > 0 ? `Còn hàng: ${product.stock}` : "Hết hàng"}
                    </Typography>
                    <Typography className="text-xl text-red-600 font-semibold">
                        {product.price.toLocaleString()}₫
                    </Typography>
                    <Button variant="contained" color="primary" size="large" className="!mt-4" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </Button>
                </Box>
            </Box>
            <Box className="max-w-5xl mx-auto p-4 gap-6 pt-20 border-r-3 border-3 mb-10 rounded-xl" sx={{ backgroundColor: '#FFFAF0' }}>
                <Typography variant="h6" textAlign="center" gutterBottom fontWeight="bold">
                    MÔ TẢ SẢN PHẨM
                </Typography>

                <Box
                    sx={{
                        '& img': {
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: 1,
                            mt: 1,
                            mb: 1,
                        },
                        '& a': {
                            color: 'primary.main',
                            textDecoration: 'underline',
                        },
                        '& p': {
                            mb: 1,
                        },
                    }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                />
            </Box>
        </>
    );
}