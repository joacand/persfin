"use client";

import Link from "next/link";
import Image from 'next/image';
import Base from "../Components/Base";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

export default function About() {
    return (
        <Base>
            <h2 className="text-3xl">About</h2>
            <div className="flex flex-col max-w-3xl text-base gap-4 bg-[#1B2227] rounded p-4">
                <p className="text-lg flex flex-row gap-2">Welcome to <strong>Perfin!</strong><Image loading="eager" src={LOGO_SRC} alt="Logo" width={24} height={24}/></p>
                <p>This is a personal finance application based on <Link className="text-blue-500" href="https://en.wikipedia.org/wiki/Double-entry_bookkeeping">double-entry accounting</Link> principles. Every transaction is recorded from an account to another account, where each account has one of the type: asset, liability, equity, revenue, or expense. This ensures the finances are always balanced and traceable.</p>
                <p>The app allows you to track your bank accounts, income, expenses, loans, and investments in a single place. By using proper accounting logic, you can generate accurate projections of your net worth and monitor how your actions affect your financial health over time.</p>
            </div>
        </Base>
    );
}
