import { API_URL } from "@/utils/api";

export default async function ProductCategoryAPI() {
    const res = await fetch(`${API_URL}/categories`, {
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
