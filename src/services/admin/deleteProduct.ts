import { API_URL } from "@/utils/api";

export default async function deleteProduct(id: string) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to delete product");
        }
        return await response;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}