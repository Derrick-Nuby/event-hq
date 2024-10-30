'use client';
import { ThemeProvider } from "./theme-provider";
import { Toaster } from 'react-hot-toast';

function providers({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Toaster />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </>
    );
};

export default providers;