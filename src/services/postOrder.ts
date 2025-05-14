import { OrderRequest } from "@/types/orderType";
import { API_URL } from "@/utils/api";

export default async function postOrder(orderRequest: OrderRequest) {
    return await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
        credentials: "include",
    });
}