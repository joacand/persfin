import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

type ButtonVariant = ButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type LinkVariant = ButtonProps & {
    href: string;
};

type PrimaryButtonProps = ButtonVariant | LinkVariant;

const baseClass = "relative bg-[#1DB954] text-[#E6F2EE] rounded-[10px] flex items-center justify-center p-2 text-center transition-transform duration-200 ease-in-out";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, disabled, ...props }) => {
    if ("href" in props && props.href) {
        return (
            <Link
                className={`${baseClass} ${className} 
                    ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:bg-[#1A7F52]'}`}
                {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            disabled={disabled}
            className={`${baseClass} ${className} 
                ${disabled ? 'opacity-50 ' : 'cursor-pointer hover:bg-[#1A7F52]'}`}
            {...props}>
            {children}
        </button>
    );
}

export default PrimaryButton;