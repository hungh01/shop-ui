import { API_URL } from "@/utils/api";

export default async function getProducts(productName?: string, productCategoryName?: string, stock?: number, page?: number, pageLimit?: number) {
    const params = new URLSearchParams();
    if (productName) {
        params.append("productName", productName);
    }
    if (productCategoryName) {
        params.append("productCategoryName", productCategoryName);
    }
    if (stock === 0 || stock === -1) {
        params.append("stock", stock.toString());
    }
    if (page) {
        params.append("page", page.toString());
    }
    if (pageLimit) {
        params.append("pageLimit", pageLimit.toString());
    }
    const queryString = params.toString();
    const response = await fetch(`${API_URL}/products/?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
}