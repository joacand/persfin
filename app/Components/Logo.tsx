import Image from 'next/image';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

interface Props {
    size?: string
    className?: string;
}

export default function Logo({ size, className }: Props) {
    return (
        <Image
            loading="eager"
            src={LOGO_SRC}
            alt="Logo"
            height={0}
            width={0}
            style={{
                width: size ?? '24px',
                height: 'auto'
            }}
            className={`${className}`} />
    );
}
