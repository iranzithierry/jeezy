"use client";
import React, { createContext, useContext } from "react";
import { Session } from "next-auth";

interface AuthContextType { }

const AuthContext = createContext<AuthContextType>({  });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthContext.Provider value={{  }}>
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
