"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeColor =
    | "white"       // Hero
    | "cyan-400"    // About (#58E0E8)
    | "purple-500"  // Projects (#8757FF)
    | "blue-500"    // Testimonials (#3EA8FF)
    | "emerald-400" // Gallery (#10B981)
    | "orange-500"; // Contact (#FF6B35)

interface ThemeContextType {
    theme: ThemeColor;
    setTheme: (theme: ThemeColor) => void;
    getHexColor: (theme: ThemeColor) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeColor>("white");

    const getHexColor = (t: ThemeColor) => {
        switch (t) {
            case "cyan-400": return "#58E0E8";
            case "purple-500": return "#8757FF";
            case "blue-500": return "#3EA8FF";
            case "emerald-400": return "#10B981";
            case "orange-500": return "#FF6B35";
            default: return "#FFFFFF";
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, getHexColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
