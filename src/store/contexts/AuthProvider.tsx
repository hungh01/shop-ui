// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { API_URL } from '@/utils/api';

interface AuthContextType {
    accessToken: string | null;
    isUser: string | null;
    setAccessToken: (token: string | null) => void;
    refreshAccessToken: () => Promise<void>;
    setIsUser: (value: string | null) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    isUser: null,
    setAccessToken: () => { },
    refreshAccessToken: async () => { },
    setIsUser: () => { },
    loading: true
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isUser, setIsUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // 👈 NEW


    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            setIsUser(data.isUser);
        } catch (error) {
            setAccessToken(null);
            setIsUser(null);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const autoRefresh = async () => {
            await refreshAccessToken();
        };
        autoRefresh();
    }, []);

    console.log("Access Token:", accessToken);
    console.log("Is User:", isUser);
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, refreshAccessToken, isUser, setIsUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
