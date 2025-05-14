import getCart from "@/services/cart/getCart";
import { ProductType } from "@/types/product/productType";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Product from "../components/product";
import { CartItem } from "@/types/cart/cart";
import getUserInfo from "@/services/getUserInfo";
import postOrder from "@/services/postOrder";
import { useNavigate } from "react-router-dom";
import NotificationModal from "@/components/notification/NotificationModal";

interface user {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    note: string;
}

export default function Cart() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRedirect = () => {
        setModalOpen(false);
        navigate('/');
    };

    const [cart, setCart] = useState<CartItem>({ products: [], totalPrice: 0 });
    const cartUser = localStorage.getItem("cart");
    const [user, setUser] = useState<user>({
        id: "", name: "", email: "", phone: "",
        city: "", district: "", ward: "", address: "", note: ""
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (cartUser) {
                    const cartItems = JSON.parse(cartUser);
                    const productIds = cartItems.map((item: { id: string }) => item.id);
                    const data = await getCart(productIds.toString());

                    const updatedProducts: CartItem["products"] = [];
                    let updatedTotalPrice = 0;

                    data.forEach((product: ProductType) => {
                        const cartItem = cartItems.find((item: { id: string }) => item.id === product.id.toString());
                        if (cartItem && cartItem.quantity > 0) {
                            const quantity = cartItem.quantity;
                            updatedProducts.push({ product, quantity });
                            updatedTotalPrice += product.price * quantity;
                        }
                    });

                    setCart({
                        products: updatedProducts,
                        totalPrice: updatedTotalPrice,
                    });
                }
            } catch (err: any) {
                console.log(err.message);
            }
        };

        const getUser = async () => {
            try {
                const user = await getUserInfo();
                setUser(user);
            } catch (err: any) {
                console.error(err.message);
            }
        };

        fetchProducts();
        getUser();

        return () => {
            setCart({ products: [], totalPrice: 0 });
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cartUser = localStorage.getItem("cart");
        if (cartUser) {
            const cartItems = JSON.parse(cartUser);
            const productIds = cartItems.map((item: { id: string }) => item.id);
            try {
                const response = await postOrder({
                    orderItems: productIds.map((id: string) => ({
                        productId: parseInt(id),
                        quantity: cartItems.find((item: { id: string }) => item.id === id).quantity,
                    })),
                    userId: user.id ? parseInt(user.id, 10) : undefined,
                    name: user.name,
                    phone: user.phone,
                    city: user.city,
                    district: user.district,
                    ward: user.ward,
                    address: user.address,
                    note: user.note,
                    totalPrice: cart.totalPrice
                });
                console.log("response", response);

                if (response.ok) {
                    localStorage.removeItem("cart");
                    setCart({ products: [], totalPrice: 0 });
                    setUser({
                        id: "", name: "", email: "", phone: "",
                        city: "", district: "", ward: "", address: "", note: ""
                    });
                    setModalOpen(true);
                } else {
                    alert("Đặt hàng thất bại!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    if (cart.products.length === 0 && !modalOpen) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Giỏ hàng trống</h1>
            </div>
        );
    }

    return (
        <>
            <NotificationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAccept={handleRedirect}
                title="Thông báo"
                message="Đơn hàng của bạn đã được đặt thành công, sẽ có bộ phận khách hàng liên hệ với bạn sớm nhất!"
            />
            <Box sx={{ paddingTop: 10 }}>
                {cart.products.map((product) => (
                    <Product key={product.product.id} product={product.product} quantity={product.quantity} setCart={setCart} />
                ))}
            </Box>

            <Box className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-8 mt-10">
                <form onSubmit={handleSubmit}>
                    {/* Tổng tiền */}
                    <Box className="text-right font-semibold">
                        Tổng hoá đơn: <Typography className=" text-red-600">{cart.totalPrice.toLocaleString()}₫</Typography>
                    </Box>

                    {/* Thông tin khách hàng */}
                    <Box>
                        <FormLabel>Thông tin khách hàng</FormLabel>
                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <TextField
                                label="Họ và Tên"
                                fullWidth
                                size="small"
                                value={user?.name}
                                required
                                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                            />
                            <TextField
                                label="Số điện thoại"
                                fullWidth
                                size="small"
                                required
                                value={user?.phone}
                            />
                        </Box>
                    </Box>

                    <Box className="bg-gray-100 p-4 rounded-lg mt-4 space-y-4">
                        <TextField
                            label="Chọn tỉnh, thành phố"
                            fullWidth
                            size="small"
                            value={user?.city}
                            required
                            onChange={(e) => setUser((prev) => ({ ...prev, city: e.target.value }))}
                        />
                        <TextField
                            label="Chọn quận, huyện"
                            fullWidth
                            size="small"
                            value={user?.district}
                            required
                            onChange={(e) => setUser((prev) => ({ ...prev, district: e.target.value }))}
                        />
                        <TextField
                            label="Phường"
                            fullWidth
                            size="small"
                            value={user?.ward}
                            required
                            onChange={(e) => setUser((prev) => ({ ...prev, ward: e.target.value }))}
                        />
                        <TextField
                            label="Địa chỉ cụ thể"
                            fullWidth
                            size="small"
                            value={user?.address}
                            required
                            onChange={(e) => setUser((prev) => ({ ...prev, address: e.target.value }))}
                        />
                        <TextField
                            label="Nhập ghi chú (nếu có)"
                            fullWidth
                            size="small"
                            multiline
                            rows={3}
                            onChange={(e) => setUser((prev) => ({ ...prev, note: e.target.value }))}
                        />
                    </Box>

                    {/* Nút đặt hàng */}
                    <Box className="space-y-2 mt-4">
                        <Button type="submit" variant="contained" fullWidth size="large">
                            Tiến hành đặt hàng
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}
