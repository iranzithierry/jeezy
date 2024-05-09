"use client";
import React, { createContext, useContext } from "react";

interface AuthContextType {
    session: any | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

export const AuthProvider: React.FC<{ children: React.ReactNode; session: any | null }> = ({ children, session }) => {
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};