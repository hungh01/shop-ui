import { SignupRequest } from "@/types/auth/signup.request";
import { API_URL } from "@/utils/api";

export default async function signupAPI(body: SignupRequest) {

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();


    return {
        status: response.status,
        data,
    };
}

