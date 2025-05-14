import Circular from "@/components/waiting/Circular";
import getOrderByUser from "@/services/getOrderByUser";
import { OrderOfUser } from "@/types/orderOfUserType";
import { API_URL } from "@/utils/api";
import { Container, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState<OrderOfUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderByUser();
                setOrders(data);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }

        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Circular />
        );
    }
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <List>
                    {orders.map((order) => (
                        <Paper key={order.id} sx={{ mb: 2, p: 2 }}>
                            <Typography variant="h6">Order #{order.id}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Trạng thái đơn: {order.status}
                            </Typography>
                            <List disablePadding>
                                {order.orderItems.map((item) => (
                                    <ListItem key={item.product.id} sx={{ pl: 0 }} component="a" href={`/products/${item.product.id}`}>
                                        <img
                                            src={API_URL + item.product.image}
                                            alt={"productImage"}
                                            style={{ width: 50, height: 50, marginRight: 16 }}
                                        />
                                        <ListItemText
                                            primary={`${item.product.name} × ${item.quantity}`}
                                            secondary={`Price: $${item.product.price.toFixed(2)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1">
                                Total: ${order.totalPrice.toFixed(2)}
                            </Typography>
                        </Paper>
                    ))}
                </List>
            )}
        </Container>
    );
}