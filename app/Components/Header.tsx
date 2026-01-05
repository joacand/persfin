"use client";

import Link from "next/link";
import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

export default function Header() {
    return (
        <header className="text-6xl p-2 text-gray-200 flex flex-row">
            <Link href={"/"}>Persfin</Link>
            <Image loading="eager" src={LOGO_SRC} alt="Logo" width={48} height={48} className="ml-4 mt-1" />
        </header>
    );
}