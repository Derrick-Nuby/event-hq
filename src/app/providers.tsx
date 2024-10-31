'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from "@/context/UserContext";

function providers({ children }: { children: React.ReactNode; }) {
    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <UserProvider>
                <Toaster />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>

    );
};

export default providers;