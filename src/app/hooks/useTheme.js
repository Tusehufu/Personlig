"use client";
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookieUtils'; 

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = getCookie('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        setCookie('theme', theme, 30); 
        document.body.className = theme;
    }, [theme]);

    return { theme, setTheme };
}
