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

// Simulating logged in state
const isLoggedIn = true;
const isAdmin = true;
export default function NavBar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              EventMaster
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/events" className="text-foreground hover:text-primary">
                Events
              </Link>
              <Link href="/categories" className="text-foreground hover:text-primary">
                Categories
              </Link>
              <Link href="/venues" className="text-foreground hover:text-primary">
                Venues
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form className="hidden md:flex">
              <Input
                type="search"
                placeholder="Search events..."
                className="w-[200px] lg:w-[300px]"
              />
            </form>
            {!isLoggedIn ? (
              <div className="space-x-2">
                <Button variant="outline">Login</Button>
                <Button>Register</Button>
              </div>
            ) : isAdmin ? (
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
                    John Doe
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
