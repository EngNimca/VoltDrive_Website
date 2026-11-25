import {useEffect, useState} from "react";

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    return [theme, toggleTheme];
}