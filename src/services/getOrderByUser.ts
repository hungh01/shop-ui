import { API_URL } from "@/utils/api";

export default async function getOrderByUser() {
    const res = await fetch(`${API_URL}/order/orderbyuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
}