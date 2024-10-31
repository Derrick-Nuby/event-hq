import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/events" className="text-foreground hover:text-primary">Events</Link></li>
              <li><Link href="/categories" className="text-foreground hover:text-primary">Categories</Link></li>
              <li><Link href="/venues" className="text-foreground hover:text-primary">Venues</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p>123 Event Street</p>
            <p>Eventville, EV 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@eventmaster.com</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary">
                <FaFacebook />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <FaXTwitter />
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2023 EventMaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
