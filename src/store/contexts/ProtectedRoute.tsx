import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import Circular from "@/components/waiting/Circular";

export const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
    const { accessToken, isUser, loading } = useAuth();

    if (loading) {
        return <Circular />;
    }
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    if (isUser) {
        return <Navigate to="/not-found" replace />;
    }

    return <>{children}</>;
};



export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { accessToken, loading } = useAuth();

    if (loading) {
        return <Circular />;
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export const IsLogin = ({ children }: { children: ReactNode }) => {
    const { accessToken, loading } = useAuth();
    if (loading) {
        return <Circular />;
    }

    if (accessToken) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}