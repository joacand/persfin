"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Services/firebase";
import { onAuthStateChanged } from "firebase/auth";

type AuthContextType = {
    user: typeof auth.currentUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<typeof auth.currentUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext value={{ user, loading }}>
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}