import React from 'react'

interface Props {
    children: React.ReactNode,
    bg_color: string,
    text?: string,
    size?: string,
    className?: string,
    type?: "button" | "submit" | "reset",
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Button({ children, bg_color, text, size, className, type, disabled, onClick }: Props) {
    return (
        <button onClick={onClick} type={type ? type : "button"} disabled={disabled} className={`${className} ${bg_color} text-${text ? text : "white"} ${size ? size : ''} font-bold rounded-full ${size ? size : "w-[30%] sm:w-[150px] h-[40px] sm:h-[40px] text-[2vw] sm:text-base"}`}>
            {children}
        </button>
    )
}
