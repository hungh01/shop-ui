import { LoginRequest } from "@/types/auth/login.request";
import { API_URL } from "@/utils/api";

export default async function loginAPI(body: LoginRequest) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    const data = await response.json();

    return {
        status: response.status,
        data,
    };
}

