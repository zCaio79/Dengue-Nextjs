'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
        const cookies = cookieString.split("; ");

        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "token") return value;
        }

        return null;
    }

    useEffect(() => {
        const token = getTokenFromCookie()

        if (token != null) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/unico`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.usuario) {
                        setUser({ name: data.usuario.nome, cidade: data.usuario.cidade });
                    }
                })
                .catch(err => console.error('Erro ao buscar usuário:', err));
        }
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
}
