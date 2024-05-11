import React from 'react'

interface Props {
    children: React.ReactNode,
    type: string,
    required?: boolean,
    hig?: boolean,
    style?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ children, type, required, hig, onChange }: Props) {
    return (
        <>
            <label className={`${hig && "text-green-600"} flex flex-col w-full text-sm font-normal text-zinc-900 gap-1`}>
                {children}
                <input type={type} required={required} onChange={onChange} className="w-full ring-1 ring-zinc-400 h-10 p-4 hover:ring-blue-400 rounded-md" />
            </label>
        </>
    )
}