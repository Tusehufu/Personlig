"use client";

import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme(); 

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <div>
            <button onClick={toggleTheme}>
                Växla till {theme === 'light' ? 'mörkt' : 'ljust'} tema
            </button>
            <p>Aktuellt tema: {theme}</p>
        </div>
    );
}
