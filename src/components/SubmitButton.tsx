import React from 'react'
import Button from './Button';

interface Props {
    children: React.ReactNode,
    bg_color?: string,
    disabled?: boolean;
}

export default function SubmitButton({ children, bg_color, disabled }: Props) {
    return (
        <Button type="submit" disabled={disabled} bg_color={bg_color ? bg_color : "bg-zinc-900"} text="white" size="h-12 min-w-max text-base" className="p-2 hover:bg-gradient-to-r from-zinc-800 to-zinc-900">
            {children}
        </Button>
    )
}