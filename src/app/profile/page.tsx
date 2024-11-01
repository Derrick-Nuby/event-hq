'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from '@/context/UserContext';
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfilePage() {
    const { user } = useUser();

    const getInitials = (name: string) => {
        if (!name) return 'U';

        const words = name.split(' ');
        if (words.length === 1) {
            return name.slice(0, 2).toUpperCase();
        }

        return words
            .map(word => word[0]?.toUpperCase() ?? '')
            .join('')
            .slice(0, 2) || 'U';
    };

    if (!user) {
        return (
            <Card className="max-w-md mx-auto">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="h-8 w-[200px]" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {getInitials(user.name ?? '')}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="space-y-4">
                    {[
                        { label: "ID", value: user.id },
                        { label: "Name", value: user.name },
                        { label: "Email", value: user.email },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center border-b border-border pb-2 last:border-b-0 last:pb-0">
                            <dt className="font-medium text-muted-foreground">{label}</dt>
                            <dd className="text-foreground">{value ?? 'N/A'}</dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
}