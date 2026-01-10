import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
    return (
        <header className="text-2xl flex flex-row font-bold">
            <Link href={"/"}>Persfin</Link>
            <Logo
                className="ml-4 mt-1" />
        </header>
    );
}