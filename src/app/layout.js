import { Inter } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css'
import Menu from "./Components/Menu";
import ThemeToggle from './Components/ThemeToggle';
import '/src/tailwind.css';
import CookieBanner from "./Components/CookieBanner";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Sportsällskapet",
    description: "Sällskap för sportare",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className={styles.main}>
                    <ThemeToggle />
                    <Menu />
                    {children}
                </main>
                <footer>
                    <CookieBanner />
                </footer>
            </body>
        </html>
    );
}
 
