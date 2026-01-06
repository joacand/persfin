import Link from "next/link";

interface ButtonProps {
    href?: string,
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const baseClass = "relative bg-[#1DB954] text-[#E6F2EE] rounded-[10px] flex items-center justify-center p-2 text-center transition-transform duration-200 ease-in-out";

const PrimaryButton: React.FC<ButtonProps> = ({ href, children, onClick, className, disabled }) => {
    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClass} ${className} 
                    ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:bg-[#1A7F52]'}`}>
                {children}
            </Link>
        );
    }
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${className} 
                ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:bg-[#1A7F52]'}`}>
            {children}
        </button>
    );
}

export default PrimaryButton;