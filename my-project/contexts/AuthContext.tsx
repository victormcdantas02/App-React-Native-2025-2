import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    id: string;
    name: string;
    email: string;
};

type SignInCredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    user: User | null;
    token: string | null;
    loading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signUp: (payload: Partial<User> & { password: string }) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
};

const STORAGE_USER_KEY = "@App:user";
const STORAGE_TOKEN_KEY = "@App:token";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // restore auth state from persistent storage
        const restore = async () => {
            try {
                const [rawUser, rawToken] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_USER_KEY),
                    AsyncStorage.getItem(STORAGE_TOKEN_KEY),
                ]);

                if (rawUser && rawToken) {
                    setUser(JSON.parse(rawUser));
                    setToken(rawToken);
                    // optionally set auth header for your API client here
                }
            } catch (err) {
                // handle/read logging as needed
            } finally {
                setLoading(false);
            }
        };

        restore();
    }, []);

    const persist = async (nextUser: User | null, nextToken: string | null) => {
        if (nextUser && nextToken) {
            await Promise.all([
                AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser)),
                AsyncStorage.setItem(STORAGE_TOKEN_KEY, nextToken),
            ]);
        } else {
            await Promise.all([
                AsyncStorage.removeItem(STORAGE_USER_KEY),
                AsyncStorage.removeItem(STORAGE_TOKEN_KEY),
            ]);
        }
    };

    const signIn = async ({ email, password }: SignInCredentials) => {
        // Replace the following mock with your real API call.
        // Example:
        // const res = await api.post('/auth/login', { email, password });
        // const { token, user } = res.data;
        // setToken(token); setUser(user); await persist(user, token);
        setLoading(true);
        try {
            // Mock response
            const mockToken = "mock-token-123";
            const mockUser: User = {
                id: "1",
                name: "Demo User",
                email,
            };

            setToken(mockToken);
            setUser(mockUser);
            await persist(mockUser, mockToken);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (payload: Partial<User> & { password: string }) => {
        setLoading(true);
        try {
            // Replace with your sign-up API call, then sign in or set returned auth state.
            // const res = await api.post('/auth/register', payload);
            // const { token, user } = res.data;
            // setToken(token); setUser(user); await persist(user, token);
            const mockToken = "mock-token-registered";
            const mockUser: User = {
                id: "2",
                name: payload.name ?? "New User",
                email: payload.email ?? "new@example.com",
            };

            setToken(mockToken);
            setUser(mockUser);
            await persist(mockUser, mockToken);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        try {
            // Optionally inform server about sign out
            setUser(null);
            setToken(null);
            await persist(null, null);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (partial: Partial<User>) => {
        if (!user) return;
        const updated = { ...user, ...partial };
        setUser(updated);
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextData => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};