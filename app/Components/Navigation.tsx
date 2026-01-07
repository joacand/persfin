"use client";

import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import { auth } from "../Services/firebase";
import { useBudget } from "./BudgetProvider";

export default function Navigation() {
    const { dispatch } = useBudget();

    async function logOut() {
        await auth.signOut()
        dispatch({ type: "RESET" });
    }

    return (
        // https://icones.js.org/collection/material-symbols
        // Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE
        <nav className="text-xl">
            <ul className="flex flex-row flex-wrap gap-4">
                <li><NavEntry>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-5v-6h-4v6zm5-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312" /></svg>
                    Home</NavEntry></li>
                <li><NavEntry href="/accounts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 12h6q.425 0 .713-.288T16 11t-.288-.712T15 10H9q-.425 0-.712.288T8 11t.288.713T9 12m0-4h6q.425 0 .713-.288T16 7t-.288-.712T15 6H9q-.425 0-.712.288T8 7t.288.713T9 8m10.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z" /></svg>
                    Accounts</NavEntry></li>
                <li><NavEntry href="/statistics">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.625 14.025L1 12.85l5-8l3 3.5l4-6.5l3 4.5L19.375 1L21 2.175l-4.95 7.85l-2.975-4.475l-3.8 6.175L6.25 8.2zM14.5 18q1.05 0 1.775-.725T17 15.5t-.725-1.775T14.5 13t-1.775.725T12 15.5t.725 1.775T14.5 18m5.1 4l-2.7-2.7q-.525.35-1.137.525T14.5 20q-1.875 0-3.187-1.312T10 15.5t1.313-3.187T14.5 11t3.188 1.313T19 15.5q0 .65-.175 1.263T18.3 17.9l2.7 2.7z" /></svg>
                    Statistics</NavEntry></li>
                <li><NavEntry href="/transactions">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 13h8v-2H8zm0 3h8v-2H8zm0 3h5v-2H8zm-2 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z" /></svg>
                    Transactions</NavEntry></li>
                <li><NavEntry href="/settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5" /></svg>                    Settings</NavEntry></li>
                <li><NavEntry href="/about">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    About</NavEntry></li>
                <li><PrimaryButton onClick={() => logOut()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    Logout</PrimaryButton></li>
            </ul>
        </nav>
    );
}

function NavEntry({ children, href }: { children: React.ReactNode, href?: string }) {
    return (
        <Link href={href ?? "/"} className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-800 hover:text-gray-200">
            {children}
        </Link>
    );
}
