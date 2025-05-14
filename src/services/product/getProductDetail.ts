import { API_URL } from "@/utils/api";

export default async function getProductDetail(productId: string) {
    const res = await fetch(`${API_URL}/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
}