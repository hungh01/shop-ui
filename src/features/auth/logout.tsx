import Circular from "@/components/waiting/Circular";
import { API_URL } from "@/utils/api";
import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        const logout = async () => {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        };
        logout();

    }, []);
    return (
        <Circular />
    );
}