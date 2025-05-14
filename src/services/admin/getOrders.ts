import { API_URL } from "@/utils/api";

export default async function getOrders() {
    const response = await fetch(`${API_URL}/order`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
}