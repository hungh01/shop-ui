import { API_URL } from "@/utils/api";

export default async function updateOrderStatus(id: number, status: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/order/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error("Failed to update order status");
    }

    return true;
}