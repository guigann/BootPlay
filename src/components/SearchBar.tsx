import React from 'react'

interface Props {
    onClick: React.MouseEventHandler<HTMLElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onClick, onChange }: Props) {
    return (

        <form className="max-w-lg mx-auto">
            <div className="flex">
                <div className="relative w-96">
                    {/* <form onSubmit={onClick}> */}
                        <input onChange={onChange} type="text" className="block p-2.5 w-full z-20 text-sm text-white bg-[#19181f] rounded-xl border border-zinc-500 " required />
                        <button type="button" onClick={onClick} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-zinc-500 rounded-lg">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    {/* </form> */}
                </div>
            </div>
        </form>

    )
}
