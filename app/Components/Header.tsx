"use client";

import Link from "next/link";
import Image from 'next/image';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

export default function Header() {
    return (
        <header className="text-2xl flex flex-row font-bold">
            <Link href={"/"}>Persfin</Link>
            <Image loading="eager" src={LOGO_SRC} alt="Logo" width={24} height={24} className="ml-4 mt-1" />
        </header>
    );
}