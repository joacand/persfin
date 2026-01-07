import { SelectHTMLAttributes } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

type SelectProps = Props & SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ children, className, ...props }) => {
    return (
        <select
            className={`bg-[#3A6F5E] p-1 rounded ${className}`}
            {...props}>
            {children}
        </select>
    );
}

export default Select;