import { API_URL } from "@/utils/api";

export default async function getCart(ids: string[]) {
    const res = await fetch(`${API_URL}/products/cart/${ids}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = res.json();
    return data;
}