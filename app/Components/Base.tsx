interface Props {
    children: React.ReactNode;
    className?: string;
}

const Base: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`flex gap-4 flex-col w-[min(100%,80rem)] ${className}`}>
            {children}
        </div>
    );
}

export default Base;