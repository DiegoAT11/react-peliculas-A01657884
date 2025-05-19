'use client';
//Cualquier interacción con el usuario poner use client

import React from 'react';
import Link from "next/link"; //Para navegar entre pantallas
import { usePathname } from 'next/navigation'; //Saber en que url estamos
import clsx from 'clsx';//Se usa para combinar clases
import path from 'path';

const links = [
    {href: '/popular', label: 'Popular'},
    {href: '/now-playing', label: 'Now Playing'},
    {href: '/top-rated', label: 'Top Rated'},
    {href: '/my-favorites', label: 'My Favorites'},
]

const Header = () => {
    const pathname = usePathname();

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black shadow-sm py-2 md:py-4">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-3xl font-bold text-white hover:text-stone-300 transitions-colors">
                Diego's Movies DB
            </Link>
            <nav className="flex gap-6">
                {links.map(({href, label}) => (
                    <Link key={href} href={href} className={clsx("text-base font-medium transition-colors hover:text-white", pathname === href ? "text-white underline" : "text-stone-300")}>
                        {label}
                    </Link>
                ))}
            </nav>

        </div>

    </header>
  );
}

export default Header;