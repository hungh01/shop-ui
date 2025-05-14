import { API_URL } from "@/utils/api";

export default async function getProductByCategory(categoryId: string, page: number, pageLimit: number) {
    const params = new URLSearchParams({
        page: page.toString(),
        pageLimit: pageLimit.toString(),
    });
    const res = await fetch(`${API_URL}/categories/${categoryId}?${params.toString()}`, {
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
