'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface User {
    name: string;
    cidade: string;

}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    function getTokenFromCookie() {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === 'token') return value;
        }
        return null;
    }

    async function refreshToken() {
        const token = getTokenFromCookie();
        if (!token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/renovar_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error('Erro ao renovar token');

            const data = await res.json();
            const newToken = data.token;

            if (!newToken) throw new Error('Token não retornado');

            document.cookie = `token=${newToken}; path=/;`;

            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/unico`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newToken}`,
                },
            });

            const userData = await userRes.json();
            if (userData.usuario) {
                setUser({
                    name: userData.usuario.nome,
                    cidade: userData.usuario.cidade,
                });
            }
        } catch (err) {
            console.error('Erro ao tentar renovar token:', err);
        }
    }

    useEffect(() => {
        refreshToken();

        const interval = setInterval(() => {
            refreshToken();
        }, 1000 * 60 * 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
    return context;
};
