import NotificationModal from "@/components/notification/NotificationModal";
import Circular from "@/components/waiting/Circular";
import getOrders from "@/services/admin/getOrders";
import { OrderOfUser } from "@/types/orderOfUserType";
import { API_URL } from "@/utils/api";
import { Button, Container, Divider, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrdersManagement() {
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState<{ id: number; status: string } | null>(null);

    const [orders, setOrders] = useState<OrderOfUser[]>([]);
    const [ordersSelected, setordersSelected] = useState<OrderOfUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStatus, setSelectedStatus] = useState<string>("Chờ xác nhận");
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
                setordersSelected(data.filter((order: OrderOfUser) => order.status === "Chờ xác nhận"));
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

    const confirmUpdate = (id: number, status: string) => {
        setPendingUpdate({ id, status });
        setModalOpen(true);
    };

    const handleUpdate = (id: number, status: string) => {

        if (id && status) {
            const updateOrderStatus = async (id: number, status: string) => {
                console.log(id, status);

                try {
                    const response = await fetch(`${API_URL}/order/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ status }),
                    });
                    if (response.ok) {
                        if (selectedStatus === "all") {
                            setordersSelected((prevOrders) =>
                                prevOrders.map((order) => (order.id === id ? { ...order, status } : order))
                            );
                        } else {
                            setordersSelected((prevOrders) =>
                                prevOrders.filter((order) => order.id !== id)
                            );
                        }
                        setOrders((prevOrders) =>
                            prevOrders.map((order) => (order.id === id ? { ...order, status } : order))
                        );
                    } else {
                        throw new Error("Failed to update order status");
                    }
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            }
            updateOrderStatus(id, status);
        }
    }

    return (

        <Container sx={{ mt: 4, pt: 5 }}>
            <NotificationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAccept={() => {
                    if (pendingUpdate) {
                        handleUpdate(pendingUpdate.id, pendingUpdate.status);
                        setModalOpen(false);
                        setPendingUpdate(null);
                    }
                }}
                title="Xác nhận"
                message={`Bạn có chắc muốn cập nhật đơn hàng #${pendingUpdate?.id} sang trạng thái "${pendingUpdate?.status}" không?`}
            />
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Filter by Status:</Typography>
                <select
                    onChange={(e) => {
                        const selectedStatus = e.target.value;
                        setSelectedStatus(selectedStatus);
                        setordersSelected(() =>
                            orders.filter((order) => order.status === selectedStatus || selectedStatus === "all")
                        );
                    }}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                >
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Huỷ đơn">Huỷ đơn</option>
                    <option value="all">Tất cả</option>
                </select>
            </Stack>

            {ordersSelected.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <List>
                    {ordersSelected.map((order) => (
                        <Paper key={order.id} sx={{ mb: 2, p: 2 }}>
                            <Typography variant="h6">Order #{order.id}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Trạng thái đơn: {order.status}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tên người nhận: {order.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số điện thoại: {order.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Địa chỉ: {order.address}, {order.ward}, {order.district}, {order.city}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ghi chú: {order.note}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1" gutterBottom>
                                Chi tiết đơn hàng
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sản phẩm đã đặt:
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
                                            secondary={`Đơn giá: ${item.product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1">
                                Giá trị đơn hàng: {(order.totalPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Stack direction="row" spacing={2} className="mt-4" /*style={{ pointerEvents: order.status === "Huỷ đơn" ? "none" : "auto", opacity: order.status === "Huỷ đơn" ? 0.5 : 1 }}*/>
                                <Button
                                    onClick={() => confirmUpdate(order.id, "Huỷ đơn")}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => confirmUpdate(order.id, "Đang vận chuyển")}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                >
                                    Delivery
                                </Button>
                                <Button
                                    onClick={() => confirmUpdate(order.id, "Hoàn thành")}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    Success
                                </Button>

                            </Stack>
                        </Paper>
                    ))}
                </List>
            )}
        </Container>
    );
}