import { InputHTMLAttributes } from "react";

interface Props {
    className?: string;
}

type InputProps = Props & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={`bg-[#3A6F5E] p-1 rounded ${className}`}
            {...props} />
    );
}

export default Input;