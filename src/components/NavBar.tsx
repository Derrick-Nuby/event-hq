'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from 'lucide-react';
import ModeToggle from './global/ModeToggle';
import { useUser } from '@/context/UserContext';
import toast from 'react-hot-toast';

// Simulating logged in state
export default function NavBar() {

  const { isAdmin, isLoggedIn, user, logout } = useUser();

  const handleSignOut = () => {
    try {
      logout();
      toast.success("Signed out successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className="bg-background border-b md:px-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            EventHQ
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/events" className="text-foreground hover:text-primary">
              Events
            </Link>
            <Link href="/venues" className="text-foreground hover:text-primary">
              Venues
            </Link>
          </nav>
          <form className="hidden md:flex">
            <Input
              type="search"
              placeholder="Search events..."
              className="w-[200px] lg:w-[300px]"
            />
          </form>
          <div className="flex items-center space-x-4">
            {!isLoggedIn() ? (
              <div className="space-x-2">
                <Link href={'/login'}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href={'/login'}>
                  <Button>Register</Button>
                </Link>
              </div>
            ) : isAdmin() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Admin Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/events">Manage Events</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/users">Manage Users</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/bookings">Manage Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
