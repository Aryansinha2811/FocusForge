// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Email/Password Login
    const login = async (email: string, password: string) => {
        try {
            await authService.loginWithEmail(email, password);
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    // Email/Password Signup
    const signup = async (email: string, password: string) => {
        try {
            await authService.signupWithEmail(email, password);
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    // Google Login/Signup
    const loginWithGoogle = async () => {
        try {
            await authService.loginWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await authService.logout();
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};